'use client';

import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, FormControl, FormLabel, Grid, TextField, Typography } from '@mui/material';
import { useGestsSection } from '@ratatouille/modules/order/react/sections/use-guests-section';

export const GuestsSection: React.FC<{}> = () => {
  const presenter = useGestsSection();
  return (
    <Box sx={{ marginTop: 2 }}>
      <Typography variant={'h5'}>Invités</Typography>
      <Grid sx={{ paddingTop: 2 }} rowSpacing={4}>
        {presenter.form.guests.map((guest, i) => (
          <Box key={i}>
            <GuestRow
              id={guest.id}
              firstName={guest.firstName}
              lastName={guest.lastName}
              age={guest.age}
              onChange={presenter.updateGuest}
              remove={presenter.removeGuest}
            />
          </Box>
        ))}
      </Grid>

      <Grid container direction={'row'} alignItems={'center'} spacing={1} marginTop={2}>
        <Grid item>
          <Button variant={'contained'} onClick={presenter.addGuests}>
            Ajouter
          </Button>
        </Grid>
        <Grid item>
          <Button variant={'contained'} onClick={presenter.onNext} disabled={presenter.isSubmittable}>
            Suivant
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export const GuestRow: React.FC<{
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  onChange: (id: string, key: string, value: string | number) => void;
  remove: (id: string) => void;
}> = ({ id, firstName, lastName, age, onChange, remove }) => {
  return (
    <Box>
      <Grid container direction={'row'} alignItems={'center'} spacing={1}>
        <Grid item>
          <FormControl>
            <FormLabel>Prénom</FormLabel>
            <TextField value={firstName} onChange={(e) => onChange(id, 'firstName', e.target.value)} />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <FormLabel>Nom</FormLabel>
            <TextField value={lastName} onChange={(e) => onChange(id, 'lastName', e.target.value)} />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <FormLabel>Âge</FormLabel>
            <TextField value={age} onChange={(e) => onChange(id, 'age', parseInt(e.target.value))} />
          </FormControl>
        </Grid>
        <Box sx={{ marginTop: 2 }}>
          <Button variant={'contained'} color={'error'} startIcon={<DeleteIcon />} onClick={() => remove(id)}>
            Supprimer
          </Button>
        </Box>
      </Grid>
    </Box>
  );
};
