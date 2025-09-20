const express = require("express");
const router = express.Router();
const supplierController = require("../controllers/supplierController");

router.get("/", supplierController.listSuppliers);
router.get("/add", supplierController.showAddForm);
router.post("/add", supplierController.addSupplier);
router.get("/edit/:id", supplierController.showEditForm);
router.post("/edit/:id", supplierController.editSupplier);
router.get("/delete/:id", supplierController.deleteSupplier);

// GET all suppliers
router.get("/", supplierController.getSuppliers);

// GET supplier by id
router.get("/:id", supplierController.getSupplierById);

// POST create supplier
router.post("/", supplierController.createSupplier);

// PUT update supplier
router.put("/:id", supplierController.updateSupplier);

// DELETE supplier
router.delete("/:id", supplierController.deleteSupplier);


module.exports = router;
/**
 * @swagger
 * components:
 *   schemas:
 *     Supplier:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated ID of the supplier
 *         name:
 *           type: string
 *           description: Supplier name
 *         address:
 *           type: string
 *           description: Supplier address
 *         phone:
 *           type: string
 *           description: Supplier phone number
 *       example:
 *         _id: 66ed2c8a4c1a2f3e5a9d1234
 *         name: Nhà cung cấp A
 *         address: 123 Đường ABC, HCM
 *         phone: 0909123456
 */

/**
 * @swagger
 * tags:
 *   name: Suppliers
 *   description: API for managing suppliers
 */

/**
 * @swagger
 * /suppliers:
 *   get:
 *     summary: Get all suppliers
 *     tags: [Suppliers]
 *     responses:
 *       200:
 *         description: List of all suppliers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Supplier'
 */
 
/**
 * @swagger
 * /suppliers/{id}:
 *   get:
 *     summary: Get a supplier by ID
 *     tags: [Suppliers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The supplier ID
 *     responses:
 *       200:
 *         description: Supplier found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Supplier'
 *       404:
 *         description: Supplier not found
 */

/**
 * @swagger
 * /suppliers:
 *   post:
 *     summary: Create a new supplier
 *     tags: [Suppliers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Supplier'
 *     responses:
 *       201:
 *         description: Supplier created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Supplier'
 */

/**
 * @swagger
 * /suppliers/{id}:
 *   put:
 *     summary: Update a supplier by ID
 *     tags: [Suppliers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Supplier ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Supplier'
 *     responses:
 *       200:
 *         description: Supplier updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Supplier'
 *       404:
 *         description: Supplier not found
 */

/**
 * @swagger
 * /suppliers/{id}:
 *   delete:
 *     summary: Delete a supplier by ID
 *     tags: [Suppliers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Supplier ID
 *     responses:
 *       200:
 *         description: Supplier deleted successfully
 *       404:
 *         description: Supplier not found
 */
