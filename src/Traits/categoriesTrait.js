const Category = require("../models/categoryModel");
const Product = require("../models/productModel");
const { deleteProduct } = require("./productsTrait");

const getAllCategories = async () => {
  try {
    const foundCategories = await Category.find();
    return { statusCode: 200, result: foundCategories };
  } catch (error) {
    throw error;
  }
};

const getOneCategory = async (id) => {
  try {
    const foundCategory = await Category.findById(id);
    if (!foundCategory)
      return { statusCode: 404, result: "Category not found." };
    return { statusCode: 200, result: foundCategory };
  } catch (error) {
    throw error;
  }
};

const createCategory = async (body) => {
  try {
    const { name, isMainCategory, parentId } = body;
    if (!name)
      return { statusCode: 400, result: `Request should contain name.` };
    if (isMainCategory === undefined)
      return {
        statusCode: 400,
        result: `Request should contain isMainCategory.`,
      };

    //prevent creating categories with same names
    const categories = await Category.find({ name });
    if (categories.length > 0)
      return {
        statusCode: 400,
        result: `Category with name of "${name}" already exists.`,
      };

    if (isMainCategory) {
      if (parentId)
        return {
          statusCode: 400,
          result: "Main categories can not get parent.",
        };
      let createdCategory = new Category({
        name,
        isMainCategory,
      });
      createdCategory = await createdCategory.save();
      return { statusCode: 200, result: createdCategory };
    } else {
      // parentId validations
      if (!parentId)
        return {
          statusCode: 400,
          result: `Request should contain parentId to create a child category.`,
        };
      const parent = await Category.findById(parentId);
      if (!parent)
        return { statusCode: 400, result: "You chose an invalid category." };
      if (parent.parentId)
        return {
          statusCode: 400,
          result: "You did not choose a main category.",
        };
      let createdCategory = new Category({
        name,
        isMainCategory,
        parentId,
      });
      createdCategory = await createdCategory.save();
      return { statusCode: 200, result: createdCategory };
    }
  } catch (error) {
    throw error;
  }
};

const updateCategory = async (id, body) => {
  try {
    const { name, isMainCategory, parentId } = body;

    const category = await Category.findById(id);
    if (!category) return { statusCode: 404, result: "Category not found." };

    if (!name)
      return { statusCode: 400, result: `Request should contain name.` };

    const categories = await Category.find({ name });
    if (categories.length > 1)
      return {
        statusCode: 400,
        result: `Category with name of "${name}" already exists.`,
      };

    // if user wants to update a main category
    if (category.isMainCategory) {
      const subCategories = await Category.find({ parentId: id });

      // if the category had any child category, only name can be updated
      if (subCategories.length > 0) {
        if (isMainCategory !== undefined && !isMainCategory)
          return {
            statusCode: 400,
            result: `Could not change isMainCategory to be false because this category is already a parent of other categories.`,
          };
        if (parentId)
          return {
            statusCode: 400,
            result: `Could not set parentId because this category is already a parent of other categories.`,
          };
        const editedCategory = await Category.findByIdAndUpdate(
          id,
          {
            name,
            isMainCategory: true,
          },
          { new: true }
        );
        return { statusCode: 200, result: editedCategory };
      }
      // if the category didn't have any child category, will check 2 conditions
      else {
        if (isMainCategory === undefined)
          return {
            statusCode: 400,
            result: `Request should contain isMainCategory.`,
          };

        // first: if user wants to keep the category to be main and only update its name
        if (isMainCategory === category.isMainCategory) {
          if (parentId)
            return {
              statusCode: 400,
              result: "Main categories can not get parent.",
            };
          const editedCategory = await Category.findByIdAndUpdate(
            id,
            {
              name,
              isMainCategory: true,
            },
            { new: true }
          );
          return { statusCode: 200, result: editedCategory };
        }
        // second: if user wants to change the category to be a child category
        else {
          if (!parentId)
            return {
              statusCode: 400,
              result: `Request should contain parentId to change a main category into a child category.`,
            };
          const parent = await Category.findById(parentId);
          if (!parent || parent.parentId)
            return {
              statusCode: 400,
              result:
                "You chose even an invalid category or not a main category.",
            };

          // if the chosen parent was a child category itself
          const parentCategory = await Category.findById(parentId);
          if (parentCategory.parentId)
            return {
              statusCode: 400,
              result:
                "You chose even an invalid category or not a main category.",
            };

          const editedCategory = await Category.findByIdAndUpdate(
            id,
            {
              name,
              isMainCategory,
              parentId,
            },
            { new: true }
          );
          return { statusCode: 200, result: editedCategory };
        }
      }
    }
    // if user wants to a child category
    else {
      // if user wants to keep the category to be main and only update its name
      if (isMainCategory === category.isMainCategory) {
        if (!parentId)
          return {
            statusCode: 400,
            result: `Request should contain parentId to create a child category.`,
          };
        const parent = await Category.findById(parentId);
        if (!parent || parent.parentId)
          return {
            statusCode: 400,
            result:
              "You chose even an invalid category or not a main category.",
          };

        const editedCategory = await Category.findByIdAndUpdate(
          id,
          {
            name,
            isMainCategory,
            parentId,
          },
          { new: true }
        );
        return { statusCode: 200, result: editedCategory };
      }
      // if user wants to change the category to be a main category
      else {
        // prevent the update if the category contains products
        const categoryProducts = await Product.find({ categoryId: id });
        if (categoryProducts.length > 0)
          return {
            statusCode: 400,
            result:
              "Could not update this category because it contains products.",
          };
        const editedCategory = await Category.findByIdAndUpdate(
          id,
          {
            name,
            isMainCategory,
            parentId: undefined,
          },
          { new: true }
        );
        return { statusCode: 200, result: editedCategory };
      }
    }
  } catch (error) {
    throw new Error(error);
  }
};

const deleteCategory = async (id) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory)
      return { statusCode: 404, result: "Category not found." };

    // if user wanna delete a main category
    if (deletedCategory.isMainCategory) {
      const deletedParentOfCategories = await Category.find({ parentId: id });
      await Category.deleteMany({ parentId: id });

      // delete products of all deleted child categories
      let deletedProducts = [];
      for (let i = 0; i < deletedParentOfCategories.length; i++) {
        const category = deletedParentOfCategories[i];
        const categoryProducts = await Product.find({
          categoryId: category._id,
        });
        for (let l = 0; l < categoryProducts.length; l++) {
          const product = categoryProducts[l];
          const { result } = await deleteProduct(product._id);
          deletedProducts.push(result);
        }
      }
      return {
        statusCode: 200,
        result: {
          deletedCategory,
          deletedParentOfCategories,
          deletedProducts,
        },
      };
    }
    // if user wanna delete a child category
    else {
      const categoryProducts = await Product.find({
        categoryId: deletedCategory._id,
      });

      // delete products of the deleted child category
      let deletedProducts = [];
      for (let l = 0; l < categoryProducts.length; l++) {
        const product = categoryProducts[l];
        const { result } = await deleteProduct(product._id);
        deletedProducts.push(result);
      }
      return {
        statusCode: 200,
        result: {
          deletedCategory,
          deletedProducts,
        },
      };
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllCategories,
  getOneCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
