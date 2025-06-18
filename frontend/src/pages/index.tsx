import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Rehearsal Scheduler - Optimize Your Band Practice</title>
        <meta name="description" content="A web application that helps bands schedule rehearsals, track attendance, and optimize practice time." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Rehearsal Scheduler
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
            Simplify band rehearsal planning, optimize scheduling, and track attendance
            with our intuitive platform designed specifically for musicians.
          </Typography>
          <Box
            sx={{
              mt: 4,
              display: 'flex',
              justifyContent: 'center',
              gap: 2
            }}
          >
            <Button variant="contained" color="primary" size="large" onClick={() => router.push('/login')}>
              Sign In
            </Button>
            <Button variant="outlined" color="primary" size="large" onClick={() => router.push('/register')}>
              Create Account
            </Button>
          </Box>
        </Container>
      </Box>

      <Container sx={{ py: 8 }} maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                p: 3,
                textAlign: 'center',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
              }}
            >
              <Typography variant="h5" component="h2" gutterBottom>
                Schedule Easily
              </Typography>
              <Typography>
                Create and manage band rehearsals with just a few clicks. Set up recurring schedules 
                and let everyone know where and when to meet.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                p: 3,
                textAlign: 'center',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
              }}
            >
              <Typography variant="h5" component="h2" gutterBottom>
                Find Optimal Times
              </Typography>
              <Typography>
                Poll band members for their availability and automatically discover 
                the best times for everyone to rehearse together.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                p: 3,
                textAlign: 'center',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
              }}
            >
              <Typography variant="h5" component="h2" gutterBottom>
                Track Progress
              </Typography>
              <Typography>
                Monitor attendance, keep rehearsal notes, and track song progress
                to make every practice session more productive.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: 'background.paper',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} Rehearsal Scheduler. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default Home;