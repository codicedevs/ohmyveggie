import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button, FormControl, Table } from "react-bootstrap";
import { useAdmin, useCategoriesActions, useTypedSelector } from "../../hooks";
import Loader from "../Loader";
import Message from "../Message";
import { CategoryInterface } from "../../interfaces";

const CategoriesList = () => {
  useAdmin();
  const inputRef = useRef(null);

  const { loading, error, data } = useTypedSelector(
    (state) => state.categories
  );

  const { createCategory, updateCategory, deleteCategory, fetchCategories } =
    useCategoriesActions();

  const [editRowId, setEditRowId] = useState(null);
  const [editField, setEditField] = useState({ field: "", value: "" });
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newCategory, setNewCategory] = useState({ _id: null, name: "" });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleEdit = (id, field, value) => {
    setEditRowId(id);
    setEditField({ field, value });
  };

  const handleChange = (e) => {
    setIsEditing(true);
    setEditField({ ...editField, value: e.target.value });
  };

  const handleCreateCategory = async () => {
    if (newCategory.name.trim() === "") return;
    await createCategory(newCategory);
    setNewCategory({ _id: null, name: "" });
    setIsCreating(false);
    fetchCategories();
  };

  const handleEditCategory = async () => {
    const category = {
      _id: editRowId,
      name: editField.value,
    };
    await updateCategory(category);
    setIsEditing(false);
    setEditRowId(null);
    fetchCategories();
  };

  const handleNewCateg = () => {
    setIsCreating(true);
  };

  const handleNewCategoryChange = (e: any) => {
    setNewCategory({ ...newCategory, name: e.target.value });
  };

  const handleDelete = async (id: string) => {
    await deleteCategory(id);
    fetchCategories();
  };

  const handleBlur = (e, id) => {
    if (
      e.relatedTarget &&
      (e.relatedTarget.className.includes("btn-sm") ||
        e.relatedTarget.className.includes("form-control"))
    ) {
      return;
    }
    setEditRowId(null);
    setEditField({ field: "", value: "" });
  };

  const handleEnter = (e: any, action: string, id?: string) => {
    if (e.key === "Enter") {
      if (action === "Crear") {
        handleCreateCategory();
      } else {
        handleEditCategory();
      }
    } else if (e.key === "Escape") {
      setEditRowId(null);
      setIsEditing(false);
      setIsCreating(false);
    }
  };

  return (
    <>
      <section
        className="d-flex row"
        style={{
          paddingLeft: 40,
          paddingRight: 40,
          justifyContent: "center",
          gap: 30,
          fontWeight: 600,
        }}
      >
        <div className="d-flex justify-content-between" style={{}}>
          <h1>Lista de Categorías</h1>
          <Button onClick={handleNewCateg} className="my-3">
            Crear Nueva Categoria
          </Button>
        </div>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID de Categoria</th>
                <th>Nombre de Categoría</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((cat) => (
                <tr key={cat._id}>
                  <td>{cat._id}</td>
                  <td onClick={() => handleEdit(cat._id, "name", cat.name)}>
                    {editRowId === cat._id && editField.field === "name" ? (
                      <FormControl
                        type="text"
                        value={editField.value}
                        onBlur={(e) => {
                          handleBlur(e, cat._id);
                        }}
                        onChange={(e) => {
                          handleChange(e);
                          setIsEditing(true);
                        }}
                        autoFocus
                        onKeyDown={(e) => handleEnter(e, cat._id)}
                      />
                    ) : (
                      cat.name
                    )}
                  </td>
                  {!isEditing ? (
                    <td>
                      <Button
                        variant="light"
                        className="btn-sm"
                        onClick={() => handleEdit(cat._id, "name", cat.name)}
                      >
                        <i className="fas fa-edit"></i>
                      </Button>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => {
                          if (
                            window.confirm(
                              "¿Estas segura de que querés borrar esta categoría?"
                            )
                          ) {
                            handleDelete(cat._id);
                          }
                        }}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  ) : (
                    <td>
                      <Button
                        variant="success"
                        className="btn-sm"
                        onClick={() => handleEditCategory()}
                      >
                        <i className="fa fa-check	"></i>
                      </Button>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => setIsEditing(false)}
                      >
                        <i className="fa fa-close"></i>
                      </Button>
                    </td>
                  )}
                </tr>
              ))}
              {isCreating && (
                <tr>
                  <td></td>
                  <td>
                    <FormControl
                      type="text"
                      title="crear"
                      value={newCategory.name}
                      onChange={handleNewCategoryChange}
                      autoFocus
                      onKeyDown={(e) => handleEnter(e, "Crear")}
                    />
                  </td>
                  <td>
                    <Button
                      variant="success"
                      className="btn-sm"
                      onClick={handleCreateCategory}
                    >
                      Crear
                    </Button>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => setIsCreating(false)}
                    >
                      Cancelar
                    </Button>
                  </td>
                </tr>
              )}
              {isEditing && <tr></tr>}
            </tbody>
          </Table>
        )}
      </section>
    </>
  );
};

export default CategoriesList;
