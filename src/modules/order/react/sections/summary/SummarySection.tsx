import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { useSummary } from '@ratatouille/modules/order/react/sections/summary/use-summary-section';

export const SummarySection: React.FC = () => {
  const presenter = useSummary();
  return (
    <Box>
      <Typography variant={'h5'}>Récapitulatif</Typography>
      <Stack spacing={2} marginTop={2}>
        <Stack spacing={1}>
          <Typography variant={'h6'}>
            <strong>Invités</strong>
          </Typography>
          {presenter.summary.guests.map(({ id, name, meals }) => (
            <>
              <Typography key={id} variant={'h6'}>
                {name}
              </Typography>
              {meals.starter && (
                <Typography key={meals.starter.id} variant={'body2'}>
                  Entrée : {meals.starter.title}
                </Typography>
              )}
              {meals.mainCourse && (
                <Typography key={meals.mainCourse.id} variant={'body2'}>
                  Plat principal : {meals.mainCourse.title}
                </Typography>
              )}
              {meals.dessert && (
                <Typography key={meals.dessert.id} variant={'body2'}>
                  Déssert : {meals.dessert.title}
                </Typography>
              )}
              {meals.drink && (
                <Typography key={meals.drink.id} variant={'body2'}>
                  Boisson : {meals.drink.title}
                </Typography>
              )}
            </>
          ))}
        </Stack>
        <Stack spacing={1}>
          <Typography variant={'h6'}>
            <strong>Table</strong>
          </Typography>
          <Typography variant={'body1'}>{presenter.summary.table.title}</Typography>
        </Stack>
      </Stack>
      <Grid container direction={'row'} alignItems={'center'} spacing={1} marginTop={2}>
        <Grid item>
          <Button variant={'contained'} onClick={presenter.onPrevious}>
            Précédant
          </Button>
        </Grid>
        <Grid item>
          <Button variant={'contained'} onClick={presenter.onNext}>
            Suivant
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
