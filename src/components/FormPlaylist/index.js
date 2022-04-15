import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addTracksToPlaylist, createPlaylist } from '../../lib/fetchApi';
//import Button from '../Button';
import Input from '../Input';
//import InputGroup from '../InputGroup';
import './index.css';
import PropTypes from 'prop-types';
import { logout } from '../../TokenSlice/index';
import { 
  Button,
  FormControl,
  FormLabel,
  Center,
  Box,
} from '@chakra-ui/react';
import { InputGroup } from 'react-bootstrap';

export default function FormPlaylist({ uriTracks }) {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const userId = useSelector((state) => state.auth.user.id);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    title: '',
    description: '',
  });

  const [errorForm, setErrorForm] = useState({
    title: '',
    description: '',
  });

  const handleForm = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
    setErrorForm({ ...errorForm, [name]: '' });
  }

  const validateForm = () => {
    let isValid = true;

    if (form.title.length < 10) {
      setErrorForm({
        ...errorForm,
        title: 'Title must be at least 10 characters long',
      });
      isValid = false;
    }

    if (form.description.length > 100) {
      setErrorForm({
        ...errorForm,
        description: 'Description must be less than 100 characters long',
      });
      isValid = false;
    }

    return isValid;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (uriTracks.length > 0) {
        try {
          const responseCreatePlaylist = await createPlaylist(accessToken, userId, {
            name: form.title,
            description: form.description,
          });

          await addTracksToPlaylist(accessToken, responseCreatePlaylist.id, uriTracks);

          toast.success('Playlist created successfully');

          setForm({ title: '', description: '' });
        } catch (error) {
          if (error.response.status === 401) {
            dispatch(logout());
          } else {
            toast.error(error.message);
          }
        }
      } else {
        toast.error('Please select at least one track');
      }
    }
  }

  return (
    <Center>
        <Box w="sm">
        <h1>Create Playlist</h1>

        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel htmlFor='title'>Title</FormLabel>
            <InputGroup>
            <Input
              type="text"
              placeholder="Title"
              value={form.title}
              id="title-playlist"
              name="title"
              onChange={handleForm}
              error={errorForm.title}
              required
              style={{ borderRadius: 8 }}
            />
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="title">Description</FormLabel>
            <InputGroup>
            <Input
              color='black'
              type='text'
              placeholder="Description"
              value={form.description}
              id="description-playlist"
              name="description"
              onChange={handleForm}
              required
              error={errorForm.description}
              style={{ borderRadius: 8 }}
              
            />
            </InputGroup>
          </FormControl>
          <Button ml="5" mb="3" width='90%' colorScheme='green' variant="solid" style={{ borderRadius: 8 }}  >Create</Button>
        </form>
      </Box>
    </Center>
  )
}

FormPlaylist.propTypes = {
  uriTracks: PropTypes.array.isRequired,
};