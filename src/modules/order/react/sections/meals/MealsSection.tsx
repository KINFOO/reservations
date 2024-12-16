import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material';
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { useMeal } from '@ratatouille/modules/order/react/sections/meals/use-meal-section';

export const MealsSection: React.FC = () => {
  const presenter = useMeal();
  return (
    <Box sx={{ marginTop: 2 }}>
      <Typography variant={'h4'}>Composez votre plat</Typography>
      <Stack sx={{ marginTop: 4 }} gap={4}>
        {presenter.guests.map((guest) => (
          <GuestMealComposer
            key={guest.id}
            guestId={guest.id}
            firstName={guest.firstName}
            lastName={guest.lastName}
            selectedStarterId={guest.meals.starter}
            selectedMainCourseId={guest.meals.mainCourse}
            selectedDessertId={guest.meals.dessert}
            selectedDrinkId={guest.meals.drink}
            starters={presenter.getSelectableStarters(guest.id)}
            mainCourses={presenter.getSelectableMainCourses(guest.id)}
            desserts={presenter.getSelectableDesserts(guest.id)}
            drinks={presenter.getSelectableDrinks(guest.id)}
            onStarterSelected={presenter.assignStarter}
            onMainCourseSelected={presenter.assignMainCourse}
            onDessertSelected={presenter.assignDessert}
            onDrinkSelected={presenter.assignDrink}
          />
        ))}
      </Stack>
      <Grid container direction={'row'} alignItems={'center'} spacing={1} marginTop={2}>
        <Grid item>
          <Button variant={'contained'} onClick={presenter.onPrevious}>
            Précédant
          </Button>
        </Grid>
        <Grid item>
          <Button variant={'contained'} onClick={presenter.onNext} disabled={!presenter.isSubmittable()}>
            Suivant
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

const GuestMealComposer: React.FC<{
  guestId: string;
  firstName: string;
  lastName: string;
  selectedStarterId?: string;
  selectedMainCourseId?: string;
  selectedDessertId?: string;
  selectedDrinkId?: string;
  starters: OrderingDomainModel.Meal[];
  mainCourses: OrderingDomainModel.Meal[];
  desserts: OrderingDomainModel.Meal[];
  drinks: OrderingDomainModel.Meal[];
  onStarterSelected: (guestId: string, mealId: string) => void;
  onMainCourseSelected: (guestId: string, mealId: string) => void;
  onDessertSelected: (guestId: string, mealId: string) => void;
  onDrinkSelected: (guestId: string, mealId: string) => void;
}> = ({
  guestId,
  firstName,
  lastName,
  starters,
  mainCourses,
  desserts,
  drinks,
  selectedStarterId,
  selectedMainCourseId,
  selectedDessertId,
  selectedDrinkId,
  onStarterSelected,
  onMainCourseSelected,
  onDessertSelected,
  onDrinkSelected,
}) => {
  return (
    <Stack rowGap={2}>
      <Typography variant={'h6'}>
        {firstName} {lastName}
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label-starter">Entrée</InputLabel>
        <Select value={selectedStarterId} label="Entrée" onChange={(e) => onStarterSelected(guestId, e.target.value)}>
          {starters.map((starter) => (
            <MenuItem key={starter.id} value={starter.id}>
              {starter.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label-main">Plat principal</InputLabel>
        <Select
          value={selectedMainCourseId}
          label="Plat principal"
          onChange={(e) => onMainCourseSelected(guestId, e.target.value)}
        >
          {mainCourses.map((meal) => (
            <MenuItem key={meal.id} value={meal.id}>
              {meal.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label-dessert">Dessert</InputLabel>
        <Select value={selectedDessertId} label="Déssert" onChange={(e) => onDessertSelected(guestId, e.target.value)}>
          {desserts.map((dessert) => (
            <MenuItem key={dessert.id} value={dessert.id}>
              {dessert.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label-drink">Drink</InputLabel>
        <Select value={selectedDrinkId} label="Déssert" onChange={(e) => onDrinkSelected(guestId, e.target.value)}>
          {drinks.map((drink) => (
            <MenuItem key={drink.id} value={drink.id}>
              {drink.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
};
