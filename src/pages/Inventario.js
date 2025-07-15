import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const campos = [
  'id_item',
  'nombre',
  'categoria',
  'cantidad',
  'unidad_medida',
  'nivel_reposicion',
  'ubicacion',
];

function Inventario() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Inventario</h2>
        <Button variant="primary" onClick={handleShow}>Agregar Item</Button>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            {campos.map((campo) => (
              <th key={campo}>{campo.replace(/_/g, ' ').toUpperCase()}</th>
            ))}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/* Aquí irán los datos de inventario en el futuro */}
        </tbody>
      </table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {campos.map((campo) => (
              <Form.Group className="mb-3" controlId={campo} key={campo}>
                <Form.Label>{campo.replace(/_/g, ' ').toUpperCase()}</Form.Label>
                <Form.Control type="text" placeholder={`Ingrese ${campo.replace(/_/g, ' ')}`} />
              </Form.Group>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
          <Button variant="primary" onClick={handleClose}>Guardar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Inventario;
