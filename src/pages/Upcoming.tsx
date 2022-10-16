import { Button, Container, Group, SimpleGrid, Skeleton, Stack, Title } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import Wrapper from './Wrapper';
import { Titles } from '../constants/Titles';
import { useSearchParams } from 'react-router-dom';
import { useQueryParams } from 'use-query-params';
import { MovieCard } from '../components/Home';
import { Helmet } from 'react-helmet';
import BackBtn from '../components/BackBtn';

const titleTypes = [{
  label: 'TV Series',
  link: 'tvSeries'
}, {
  label: 'Movies',
  link: 'movie'
}, {
  label: 'Short',
  link: 'short'
}, {
  label: 'Podcast',
  link: 'podcastSeries'
}];

const Upcoming = (): JSX.Element => {
  const [data, setData] = useState<Titles>({
    page: '',
    entries: 0,
    results: [],
    next: ''
  });
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  const [queryParams, setQueryParams] = useQueryParams();
  const [isLoading, setIsLoading] = useState(false);
  const titleType = searchParams.get('titleType');

  const headerOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '4oMcDEyGMDmshx6PYmJkcJYSgoOhp198V0UjsnI7mPJqb4n5r8',
      'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
    }
  };

  /**
   * fetch upcoming data by title type selected
   * @param pageNumber
   */
  const fetchUpcomingData = async (pageNumber: number): Promise<void> => {
    setIsLoading(true);
    let filters = '';
    if (Boolean(titleType)) {
      filters += `&titleType=${String(titleType) ?? ''}`;
    }

    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    await fetch(`https://moviesdatabase.p.rapidapi.com/titles/x/upcoming?page=${pageNumber}&info=mini_info&sort=year.incr&limit=15${filters}`, headerOptions)
      .then(async response => await response.json())
      .then((response: Titles) => {
        setData({
          entries: response.entries,
          next: response.next,
          page: response.page,
          results: [...data.results, ...response.results]
        });
        setIsLoading(false);
      })
      .catch(err => console.error(err));
  };

  /**
   * increase page count
   */
  const increasePageCount = (): void => {
    setPage(page + 1);
  };

  /**
   * set active button and disable
   * @param t
   */
  const handleActiveButton = (t: string): boolean => {
    return titleType === t;
  };

  useEffect(() => {
    void fetchUpcomingData(page);
    console.log(queryParams);
  }, [page, titleType]);

  return (
    <Wrapper>
      <Helmet>
        <title>Flick city - Upcoming</title>
      </Helmet>
      <Container fluid py="lg">
        <Stack>
          <BackBtn />
          <Skeleton visible={isLoading}>
            <Title>Upcoming </Title>
          </Skeleton>
          <Skeleton visible={isLoading}>
            <Group spacing="xs">
              {titleTypes.map(t =>
                <Button
                  key={t.link}
                  compact
                  variant="outline"
                  onClick={() => {
                    setQueryParams({ titleType: t.link });
                    setData({
                      page: '',
                      entries: 0,
                      results: [],
                      next: ''
                    });
                  }}
                  disabled={handleActiveButton(t.link)}
                >
                  {t.label}
                </Button>
              )}
            </Group>
          </Skeleton>
          <SimpleGrid cols={5}>
            {Boolean(data?.results) &&
              data?.results.map((d) =>
                <MovieCard data={d} height={300} key={d.id} isLoading={isLoading}/>
              )
            }
          </SimpleGrid>
          <Button size="md" variant="outline" onClick={increasePageCount} loading={isLoading}>Load more</Button>
        </Stack>
      </Container>
    </Wrapper>
  );
};

export default Upcoming;
