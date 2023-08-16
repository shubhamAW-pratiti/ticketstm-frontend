import { Grid } from "@mui/material";

<Container maxWidth='md'>
    <Paper
        sx={{
            padding: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            alignItems: 'center',
            maxWidth: 'md',
            backgroundColor: 'whitesmoke',
        }}
    >
        <Typography variant="h4" component="h4">
            Login
        </Typography>

        <Grid container spacing={2}>
            <Grid item xs={12} >
                <TextField
                          type='email'
                                id="email-signin"
                                label="Email"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                required
                                value={email}
                                error={!isEmailValid}
                                helperText={isEmailValid ? '' : 'Invalid email format'}
                                onChange={(e) => handleEmailChange(e.target.value)}
                />
                <TextField
                 type='password'
                       id="password-signin"
                       label="Password"
                       variant="outlined"
                       fullWidth
                       margin="normal"
                       required
                       value={password}
                       error={!isPasswordStrong}
                       helperText={(!isPasswordStrong) ?'password must contain letter, alphabet and special character':''}
                       onChange={(e) => handlePasswordChange(e.target.value)}
                     />
            </Grid>
        </Grid>

        {/* login & reset */}
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <Button
                    variant='contained'
                    size='large'
                    fullWidth
                    onClick={handleLogin}
                >

                    Login
                </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Button
                    variant="outlined"
                    size='large'
                    fullWidth
                    type="reset"

                >
                    Reset
                </Button>
            </Grid>
        </Grid>

        {/* signup & forgot pass */}

        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <Link to='/Signup'>Signup </Link>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Link to='/ForgotPass'>Forgot Password </Link>
            </Grid>
        </Grid>



    </Paper>

</Container>