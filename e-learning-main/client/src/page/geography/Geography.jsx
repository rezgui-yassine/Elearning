import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { CheckCircle, Cancel } from '@mui/icons-material';
import Swal from 'sweetalert2';
import styled from 'styled-components';

const Container = styled.div`
  margin: 20px;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
`;

const Error = styled.div`
  color: red;
  text-align: center;
  margin-top: 20px;
`;

const Geography = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/api/users/all')
      .then(response => {
        if (Array.isArray(response.data)) {
          const filteredUsers = response.data.filter(user => user.role === 'FORMATEUR' || user.role === 'STUDENT');
          setUsers(filteredUsers);
          
        } else {
          setError('Format de réponse inattendu');
        }
      })
      .catch(error => {
        console.error('Une erreur s\'est produite lors de la récupération des utilisateurs !', error);
        setError('Une erreur s\'est produite lors de la récupération des utilisateurs');
      });
  }, []);

  const handleDeactivate = async (id) => {
    const result = await Swal.fire({
      title: 'Êtes-vous sûr(e) ?',
      text: "Vous ne pourrez pas annuler cette action !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, désactiver !'
    });

    if (result.isConfirmed) {
      deactivateUser(id);
    }
  };

  const handleActivate = async (id) => {
    const result = await Swal.fire({
      title: 'Êtes-vous sûr(e) ?',
      text: "Vous ne pourrez pas annuler cette action !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, activer !'
    });

    if (result.isConfirmed) {
      activateUser(id);
    }
  };

  const activateUser = (userId) => {
    axios.put(`http://localhost:3000/api/auth/${userId}/activate`)
      .then(response => {
        if (response.status === 200) {
          setUsers(users.map(user => user._id === userId ? { ...user, isActivee: true } : user));
          Swal.fire(
            'Activé !',
            'L\'utilisateur a été activé.',
            'success'
          );
        } else {
          Swal.fire(
            'Erreur !',
            'Une erreur s\'est produite lors de l\'activation de l\'utilisateur.',
            'error'
          );
        }
      })
      .catch(error => {
        console.error('Une erreur s\'est produite lors de l\'activation de l\'utilisateur !', error);
        Swal.fire(
          'Erreur !',
          'Une erreur s\'est produite lors de l\'activation de l\'utilisateur.',
          'error'
        );
      });
  };

  const deactivateUser = (userId) => {
    axios.put(`http://localhost:3000/api/auth/${userId}/deactivate`)
      .then(response => {
        if (response.status === 200) {
          setUsers(users.map(user => user._id === userId ? { ...user, isActivee: false } : user));
          Swal.fire(
            'Désactivé !',
            'L\'utilisateur a été désactivé.',
            'success'
          );
        } else {
          Swal.fire(
            'Erreur !',
            'Une erreur s\'est produite lors de la désactivation de l\'utilisateur.',
            'error'
          );
        }
      })
      .catch(error => {
        console.error('Une erreur s\'est produite lors de la désactivation de l\'utilisateur !', error);
        Swal.fire(
          'Erreur !',
          'Une erreur s\'est produite lors de la désactivation de l\'utilisateur.',
          'error'
        );
      });
  };

  const columns = [
    { field: 'firstName', headerName: 'Nom', flex: 1 },
    { field: 'lastName', headerName: 'Prénom', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'role', headerName: 'Rôle', flex: 1 },
    {
      field: 'isActivee',
      headerName: 'Statut',
      flex: 1,
      renderCell: (params) => (
        params.value ? <CheckCircle style={{ color: 'green' }} /> : <Cancel style={{ color: 'red' }} />
      )
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: (params) => (
        params.row.isActivee ? (
          <Cancel onClick={() => handleDeactivate(params.row._id)} style={{ color: 'red', cursor: 'pointer' }} />
        ) : (
          <CheckCircle onClick={() => handleActivate(params.row._id)} style={{ color: 'green', cursor: 'pointer' }} />
        )
      )
    }
  ];

  return (
    <Container>
      <Title>Liste des utilisateurs</Title>
      {error ? (
        <Error>{error}</Error>
      ) : (
        <div style={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={users}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 20]}
            checkboxSelection={false}
            disableSelectionOnClick
            getRowId={(row) => row._id}
          />
        </div>
      )}
    </Container>
  );
};

export default Geography;
