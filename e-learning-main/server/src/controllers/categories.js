const mongoose = require("mongoose");
const Category = require("../models/Categories");
const User = require("../models/userModule");
const multer = require("multer");
const path = require("path");
const fs = require("fs"); // Importez le module fs pour utiliser la fonction unlinkSync
const jwt = require("jsonwebtoken"); // Import jwt library
const fetchUser = require("../middlewares/fetchUser");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../../uploads"), // Chemin de destination mis à jour
  filename: (req, file, redirect) => {
    let date = Date.now();
    let fl = date + "." + file.mimetype.split("/")[1];
    redirect(null, fl);
    __filename = fl; // Assigner le nom de fichier à la variable définie à l'extérieur
  },
});

exports.upload = multer({ storage: storage });

exports.createCategory = async (req, res) => {
  try {
    const data = req.body;
    let filename = ""; // Définir filename avant de l'utiliser
    if (req.file && req.file.filename) {
      filename = req.file.filename; // Récupérer le nom de fichier depuis req.file
    }
    const category = new Category(data);
    category.imageUrl = filename; // Assigner le nom de fichier à imageUrl
    const savedCategory = await category.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getImage = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category || !category.imageUrl) {
      return res.status(404).send("Image not found");
    }
    const imagePath = path.join(
      __dirname,
      "../../../uploads",
      category.imageUrl
    ); // Chemin de l'image à envoyer
    res.sendFile(imagePath);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// Le reste de votre code reste inchangé

//get the Category by id
exports.getCategoryById = async (req, res) => {
  try {
    // get the id from the request
    const id = req.params.id;
    // get the data from the database using the id
    const category = await Category.findById(id).populate("courses");
    // send the Category in the response
    res.status(200).send(category);
  } catch (error) {
    res.status(500).send(error);
  }
};

//get all Categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate("courses");
    res.status(200).send(categories);
  } catch (error) {
    res.status(500).send(error);
  }
};
// get categories with courses and attachments
exports.getCategoriesWithCoursesAndAttachments = async (req, res) => {
  try {
    const categories = await Category.find()
      .populate({
        path: "courses",
        populate: {
          path: "attachments",
          model: "Attachment",
        },
      })
      .populate("attachments");
    res.status(200).send(categories);
  } catch (error) {
    res.status(500).send(error);
  }
};

//update Category by id

exports.updateCategoryById = async (req, res) => {
  try {
    const id = req.params.id;
    let data = { ...req.body };

    if (req.file && req.file.filename) {
      // Si une nouvelle image est téléchargée, générer un nouveau nom de fichier
      const newFilename = Date.now() + "-" + req.file.filename;
      data.imageUrl = newFilename;

      // Récupérer l'ancienne catégorie pour obtenir le nom de l'image précédente
      const oldCategory = await Category.findById(id);

      // Vérifier si l'ancienne catégorie a une image
      if (oldCategory && oldCategory.imageUrl) {
        // Construire le chemin absolu vers l'ancienne image
        const oldImagePath = path.join(
          __dirname,
          "../../../uploads",
          oldCategory.imageUrl
        );
        // Supprimer l'ancienne image du serveur
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      // Renommer le fichier téléchargé avec le nouveau nom de fichier
      fs.renameSync(
        path.join(__dirname, "../../../uploads", req.file.filename),
        path.join(__dirname, "../../../uploads", newFilename)
      );
    } else if (typeof data.imageUrl === "object" && data.imageUrl !== null) {
      // Si imageUrl est un objet, le supprimer des données
      delete data.imageUrl;
    }

    // Assurez-vous que le champ imageUrl n'est pas supprimé si l'image n'est pas modifiée
    if (!req.file && !data.imageUrl) {
      delete data.imageUrl;
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!updatedCategory) {
      return res.status(404).send("Category not found");
    }

    res.status(200).send(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

//delete Category by id
exports.deleteCategoryById = async (req, res) => {
  try {
    // get the id from the request
    const id = req.params.id;
    // delete the Category
    const category = await Category.findByIdAndDelete(id);
    // send the deleted Category in the response
    res.status(200).send(category);
  } catch (error) {
    res.status(500).send(error);

    console.log("error" + error);
  }
};

// get All courses in categories
exports.getAllCoursesInCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findById(id).populate("courses");
    res.status(200).send(category.courses);
  } catch (error) {
    res.status(500).send(error);
  }
};

//delete Category by id
exports.deleteCategoryById = async (req, res) => {
  try {
    // get the id from the request
    const id = req.params.id;
    // delete the Category
    const category = await Category.findByIdAndDelete(id);
    // send the deleted Category in the response
    res.status(200).send(category);
  } catch (error) {
    res.status(500).send(error);

    console.log("error" + error);
  }
};

// get All courses in categories
exports.getAllCoursesInCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findById(id).populate("courses");
    res.status(200).send(category.courses);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.joinCategory = async (req, res, next) => {
  try {
    fetchUser(req, res, async () => {
      const userId = req.user._id;
      const { categoryId } = req.params;

      const category = await Category.findById(categoryId);
      if (!category) return next(createError(404, "Category not found"));

      if (!category.users || !category.users.includes(userId)) {
        category.users = category.users || [];
        category.users.push(userId);
        await category.save();

        const user = await User.findById(userId);
        if (!user) return next(createError(404, "User not found"));

        if (!user.categories || !user.categories.includes(categoryId)) {
          // Change Category to categories
          user.categories = user.categories || []; // Change Category to categories
          user.categories.push(categoryId); // Change Category to categories
          await user.save();
        }

        console.log(
          "User joined category:",
          userId,
          "Category:",
          category.name
        );
      }

      res.json({ message: "Successfully joined the category" });
    });
  } catch (error) {
    console.error("Error joining category:", error);
    return next(createError(401, "Unauthorized"));
  }
};

exports.getJoinedCategories = async (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];
  if (!token) return next(createError(401, "Unauthorized"));

  try {
    const decoded = jwt.verify(token, "secretkey123");
    const userId = decoded._id;

    const user = await User.findById(userId).populate("categories");
    if (!user) return next(createError(404, "User not found"));

    res.json(user.categories);
  } catch (error) {
    console.error("Error getting joined categories:", error);
    return next(createError(401, "Unauthorized"));
  }
};
