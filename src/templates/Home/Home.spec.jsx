import { rest } from 'msw';
import { setupServer } from 'msw/node';

import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { Home } from '.';
import userEvent from '@testing-library/user-event';

const handlers = [
  rest.get(
    'https://jsonplaceholder.typicode.com/posts',
    async (req, res, ctx) => {
      return res(
        ctx.json([
          {
            userId: 1,
            id: 1,
            title: 'title 1',
            body: 'body 1',
          },
          {
            userId: 2,
            id: 2,
            title: 'title 2',
            body: 'body 2',
          },
          {
            userId: 3,
            id: 3,
            title: 'title 3',
            body: 'body 3',
          },
        ])
      );
    }
  ),

  rest.get(
    'https://jsonplaceholder.typicode.com/photos',
    async (req, res, ctx) => {
      return res(
        ctx.json([
          { url: 'img1.jpg' },
          { url: 'img2.jpg' },
          { url: 'img3.jpg' },
        ])
      );
    }
  ),
];

//Fazendo destructuring para passar as informações
const server = setupServer(...handlers);

describe('<Home/>', () => {
  beforeAll(() => {
    //Antes de todos os testes, liga o servidor
    server.listen();
  });

  //Depois de cada teste, reseta os handlers para um teste não interferir o outro
  afterEach(() => server.resetHandlers());

  afterAll(() => {
    //Antes de todos os testes, desliga o servidor
    server.close();
  });

  it('should render search, posts and load more', async () => {
    render(<Home />);

    const noMorePosts = screen.getByText('Não existem posts =(');

    //Esperar que o texto de que não existem posts seja removido da tela
    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/type your search/i);
    expect(search).toBeInTheDocument();

    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThanOrEqual(2);

    const button = screen.getByRole('button', { name: /load more posts/i });
    expect(button).toBeInTheDocument();
  });

  it('should search posts when type in input', async () => {
    render(<Home />);

    const noMorePosts = screen.getByText('Não existem posts =(');

    //Esperar que o texto de que não existem posts seja removido da tela
    await waitForElementToBeRemoved(noMorePosts);

    const input = screen.getByPlaceholderText(/type your search/i);
    expect(input).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: 'title 1 1' })
    ).toBeInTheDocument();

    const valueSearch = 'title 1';

    userEvent.type(input, valueSearch);

    expect(
      screen.getByRole('heading', { name: 'title 1 1' })
    ).toBeInTheDocument();

    expect(
      screen.queryByRole('heading', { name: 'title 2 2' })
    ).not.toBeInTheDocument();

    userEvent.clear(input);

    const valueSearch2 = 'no more posts';
    userEvent.type(input, valueSearch2);

    expect(screen.getByText('Não existem posts =(')).toBeInTheDocument();
  });

  it('should add more posts when press load more button', async () => {
    render(<Home />);

    const noMorePosts = screen.getByText('Não existem posts =(');

    await waitForElementToBeRemoved(noMorePosts);

    let posts = screen.getAllByRole('heading');
    expect(posts.length).toEqual(2);

    const loadMorePostsButton = screen.getByRole('button', {
      name: /load more/i,
    });
    expect(loadMorePostsButton).toBeInTheDocument();

    userEvent.click(loadMorePostsButton);
    posts = screen.getAllByRole('heading');

    expect(posts.length).toEqual(3);
    expect(loadMorePostsButton).toBeDisabled();
  });
});
