import { render, screen } from '@testing-library/react';
import { Posts } from './index.jsx';

const props = {
  posts: [
    {
      id: 1,
      title: 'title 1 ',
      body: 'body 1',
      cover: 'img/img1.png',
    },
    {
      id: 2,
      title: 'title 2 ',
      body: 'body 2',
      cover: 'img/img2.png',
    },
    {
      id: 3,
      title: 'title 3 ',
      body: 'body 3',
      cover: 'img/img3.png',
    },
  ],
};

describe('<Posts/>', () => {
  it('should render posts', () => {
    render(<Posts {...props} />);
    //Verifica se tem 3 elementos de cabeçalho (h1,h2.h3 ...)
    expect(screen.getAllByRole('heading', { name: /title/i })).toHaveLength(3);
    //Verifica se tem 3 elementos do tipo img, com o alt(nesse caso é o msm nome do title) title em algum lugar
    expect(screen.getAllByRole('img', { name: /title/i })).toHaveLength(3);
    //Verifica se tem 3 elementos com o texto body(nesse exemplo das props teria o body1,body2,body3)
    expect(screen.getAllByText(/body/i)).toHaveLength(3);
    //Verifica se uma imagem tem o alt(nesse caso é o msm nome do title) title3, e se essa tem o atributo src igual a : img/img3.png
    expect(screen.getByRole('img', { name: /title 3/i })).toHaveAttribute(
      'src',
      'img/img3.png'
    );
  });

  it('should match snapshot', () => {
    //Cria um container com posts
    const { container } = render(<Posts {...props} />);
    //Verifica se o primeiro conteudo do container(O Posts) é igual ao snapshot
    expect(container.firstChild).toMatchSnapshot();
  });
});
