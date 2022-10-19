import React from 'react';
import { createStyles, Title, Text, Button, Container, Group } from '@mantine/core';
import { BsHouse } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import BackBtn from '../components/BackBtn';
import Wrapper from './Wrapper';

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80
  },

  label: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 220,
    lineHeight: 1,
    marginBottom: theme.spacing.xl * 1.5,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],

    [theme.fn.smallerThan('sm')]: {
      fontSize: 120
    }
  },

  title: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 38,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 32
    }
  },

  description: {
    maxWidth: 500,
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5
  }
}));

const Error404 = (): JSX.Element => {
  const { classes } = useStyles();

  return (
    <Wrapper>
      <Container className={classes.root}>
        <div className={classes.label}>404</div>
        <Title className={classes.title}>Page not found.</Title>
        <Text color="dimmed" size="lg" align="center" className={classes.description}>
          Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has
          been moved to another URL.
        </Text>
        <Group position="center">
          <Button variant="light" size="md" leftIcon={<BsHouse/>} component={Link} to="/">
            Take me back to home page
          </Button>
          <BackBtn/>
        </Group>
      </Container>
    </Wrapper>
  );
};

export default Error404;