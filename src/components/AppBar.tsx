import React, { useEffect, useState } from 'react';
import {
  createStyles,
  Header,
  Group,
  Burger,
  TextInput,
  Text,
  Container
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { BsSearch } from 'react-icons/bs';
import { FcFilmReel } from 'react-icons/fc';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useNavigateSearch } from '../hooks';

const useStyles = createStyles((theme) => ({
  header: {
    paddingTop: theme.spacing.xs,
    paddingBottom: theme.spacing.xs,
    paddingLeft: theme.spacing.xl,
    paddingRight: theme.spacing.xl,
    position: 'sticky',
    boxShadow: theme.shadows.sm
  },

  inner: {
    height: 56,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  links: {
    [theme.fn.smallerThan('md')]: {
      display: 'none'
    }
  },

  search: {
    width: 500,
    [theme.fn.smallerThan('xs')]: {
      display: 'none'
    }
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: theme.spacing.sm,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,
    textTransform: 'capitalize',

    '&:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      cursor: 'pointer'
    }
  },

  active: {
    display: 'block',
    lineHeight: 1,
    padding: theme.spacing.sm,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,
    cursor: 'pointer',
    backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
    color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color
  },

  linkLabel: {
    marginRight: 5
  }
}));

interface AppBarProps {
  links: Array<{ link: string, label: string, list?: string }>
}

const AppBar = ({ links }: AppBarProps): JSX.Element => {
  const [opened, { toggle }] = useDisclosure(false);
  const [searchTerm, setSearchTerm] = useState('');
  const isMobile = useMediaQuery('(max-width: 600px)');
  const { classes } = useStyles();
  const { query } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const navigateSearch = useNavigateSearch();

  /**
   * resolve current location
   * @param href
   */
  const urlResolver = (href: string): boolean => {
    return location.pathname.includes(href);
  };

  /**
   * on enter pressed
   * @param event
   */
  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter') {
      navigate(`/search/${searchTerm}`);
    }
  };

  /**
   * handle link open/navigate
   * @param linkObj
   * @param requireList
   */
  const handleLinkOpen = (linkObj: { link: string, label: string, list?: string }, requireList: boolean): void => {
    const {
      list,
      link
    } = linkObj;

    requireList ? navigateSearch(`/titles${link}`, { list }) : navigateSearch(`/titles${link}`);
  };

  useEffect(() => {
    setSearchTerm(query ?? '');
  }, [query]);

  return (
    <Header height="100%" className={classes.header}>
      <Container fluid>
        <div className={classes.inner}>
          <Group>
            {isMobile && <Burger opened={opened} onClick={toggle} size="sm"/>}
            <FcFilmReel size={32}/>
            <Text size="xl" weight={500} component={Link} to="/">Flickcity</Text>
          </Group>

          <TextInput
            icon={<BsSearch size={14}/>}
            placeholder="Search for movies, series, tv shows, people..."
            className={classes.search}
            onKeyDown={handleKeyDown}
            onChange={(event) => setSearchTerm(event.currentTarget.value)}
            value={searchTerm}
          />

          <Group spacing='sm' className={classes.links}>
            {links.map(link =>
              <a
                key={link.label}
                className={urlResolver(link.link) ? classes.active : classes.link}
                onClick={() => handleLinkOpen(link, Boolean(link.list))}
              >
                {link.label}
              </a>
            )}
            <Link
              key='upcoming'
              className={classes.link}
              to='/upcoming'
            >
              Upcoming
            </Link>
          </Group>
        </div>
      </Container>
    </Header>
  );
};

export default AppBar;
