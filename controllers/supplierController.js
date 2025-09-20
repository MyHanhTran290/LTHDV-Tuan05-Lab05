const Supplier = require("../models/supplier");

// GET all suppliers
exports.getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET supplier by id
exports.getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) return res.status(404).json({ error: "Supplier not found" });
    res.json(supplier);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST create supplier
exports.createSupplier = async (req, res) => {
  try {
    const supplier = new Supplier(req.body);
    await supplier.save();
    res.status(201).json(supplier);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT update supplier
exports.updateSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!supplier) return res.status(404).json({ error: "Supplier not found" });
    res.json(supplier);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE supplier
exports.deleteSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndDelete(req.params.id);
    if (!supplier) return res.status(404).json({ error: "Supplier not found" });
    res.json({ message: "Supplier deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Hiển thị danh sách supplier
exports.listSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.render("suppliers/index", { suppliers });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Hiển thị form thêm
exports.showAddForm = (req, res) => {
  res.render("suppliers/new");
};

// Xử lý thêm
exports.addSupplier = async (req, res) => {
  try {
    const { name, address, phone } = req.body;
    await Supplier.create({ name, address, phone });
    res.redirect("/suppliers");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Hiển thị form sửa
exports.showEditForm = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    res.render("suppliers/edit", { supplier });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Xử lý sửa
exports.editSupplier = async (req, res) => {
  try {
    const { name, address, phone } = req.body;
    await Supplier.findByIdAndUpdate(req.params.id, { name, address, phone });
    res.redirect("/suppliers");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Xóa
exports.deleteSupplier = async (req, res) => {
  try {
    await Supplier.findByIdAndDelete(req.params.id);
    res.redirect("/suppliers");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

