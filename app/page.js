'use client';

import { Box, Button, Typography, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function LandingPage() {
  const router = useRouter();

  const theme = createTheme({
    palette: {
      primary: {
        main: '#000000',
      },
      secondary: {
        main: '#ffcc00',
      },
    },
    typography: {
      h1: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        textAlign: 'left', 
        marginBottom: '0.5rem',
        marginTop:'1rem', 
      },
      body1: {
        fontSize: '1.2rem',
        textAlign: 'left', 
        marginBottom: '0rem',
      },
    },
  });

  const handleStartChat = () => {
    router.push('/chatbot'); 
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        bgcolor="white"
        p={2}
      >
        <Stack
          direction="column"
          width="100%"
          maxWidth="500px"
          height="700px"
          border="1px solid #ccc"
          borderRadius={8} 
          p={4}
          spacing={1}
          boxShadow={3}
          bgcolor="#FDEDD4"
        >
          <img src="logo.png" alt="Logo" style={{ width: '40%', borderRadius: 20}} />
          <Box mb={2} textAlign="center">
            <Typography variant="h1"> 
              Explore the world,<br />
              one conversation at <br />a time
            </Typography>
            <Typography variant="body1">
              Discover personalized travel assistance with Voyago. Ready to start your journey?
            </Typography>
          </Box>

          <Box textAlign={'center'} mt={2}>
            <img src="landingimg.jpg" alt="Landing Image" style={{ width: '80%', borderRadius: 8}} />
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexGrow={1}
            mt={2}
          >
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={handleStartChat}
              sx={{ borderRadius: '50px', px: 4, width: '400px' }}
            >
              Start Now
            </Button>
          </Box>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
