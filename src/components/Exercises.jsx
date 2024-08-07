import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
// https://mui.com/material-ui/react-pagination/
import { Box, Stack, Typography } from '@mui/material';

import { exerciseOptions, fetchData } from '../utils/fetchData';
import ExerciseCard from './ExerciseCard';
import Loader from './Loader';

const Exercises = ({ exercises, setExercises, bodyPart }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage, setExercisePerPage] = useState(6);

  useEffect(() => {
    const fetchExercisesData = async () => {
      let exercisesData = [];

      if (bodyPart === 'all') {
        exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises?limit=30&offset=0', exerciseOptions);
        // console.log(exercisesData,"exercisesData")
      } else {
        exercisesData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, exerciseOptions);
        // console.log(exercisesData,"exercisesData")
      }

      setExercises(exercisesData);
    };

    fetchExercisesData();
  }, [bodyPart]);
  
  // console.log(bodyPart,"bodyPart")
  // console.log(exercisesData,"exercisesData")
  // Pagination
  const indexOfLastExercise = currentPage * exercisesPerPage; //6= 1 * 6
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage; // 0 = 6-6
  const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise); //only show [0]~ [6-1]
  //slice method is ([A],[B])   get array which starts from [A] to [B-1]

  //need to only show those moves belongs to that page in pagination
  // 1,2,3,4,5,6,7,8,.........
  //current page is index 1 , showing only 1 ~ 6 

  const paginate = (event, value) => {
    setCurrentPage(value);
    //value is from material-UI build-in variables

    window.scrollTo({ top: 1800, behavior: 'smooth' });
  };

  if (!currentExercises.length) return <Loader />;

  return (
    <Box id="exercises" sx={{ mt: { lg: '109px' } }} mt="50px" p="20px">
      <Typography variant="h4" fontWeight="bold" sx={{ fontSize: { lg: '44px', xs: '30px' } }} mb="46px">Showing Results</Typography>
      <Stack direction="row" sx={{ gap: { lg: '107px', xs: '50px' } }} flexWrap="wrap" justifyContent="center">
      
        {currentExercises.map((exercise, idx) => (
          <ExerciseCard key={idx} exercise={exercise} />
        ))}
      </Stack>
      <Stack sx={{ mt: { lg: '114px', xs: '70px' } }} alignItems="center">
        {exercises.length > 6 && (
          <Pagination
            color="standard"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(exercises.length / exercisesPerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        )}
      </Stack>
    </Box>
  );
};

export default Exercises;

