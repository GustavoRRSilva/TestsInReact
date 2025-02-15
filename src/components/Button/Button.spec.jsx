import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '.';
import userEvent from '@testing-library/user-event';
describe('<Button>', () => {
  it('should render the button with the text "Load more" ', () => {
    render(<Button text='Load more' onClick={() => console.log('hello')} />);
    //Verifica se tem um botão com o texto load more,
    const button = screen.getByRole('button', { name: /load more/i });
    //Verifica se tem um botão no documento
    expect(button).toBeInTheDocument();
    //Verifica se o botão tem o atributo classe com o valor button
    expect(button).toHaveAttribute('class', 'button');
  });

  it('should call function on buttonclick', () => {
    //Cria uma função fake
    const fn = jest.fn();
    //Renderiza o botão
    render(<Button text='Load more' onClick={fn} />);

    //Busca o botão pelo <button>, que possua o texto load more
    const button = screen.getByRole('button', { name: /load more/i });

    //Cria o evento de click no botão
    userEvent.click(button);

    //Verifica se a função foi chamada uma vez
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled is true', () => {
    //Desabilitando o botão
    const disabled = true;

    //Renderiza o botão
    render(
      <Button
        text='Load more'
        disabled={disabled}
        onClick={() => console.log('hello')}
      />
    );
    //Procura o botão pelo <button> que possua o valor de name load more
    const button = screen.getByRole('button', { name: /load more/i });
    //Espera que o botão esteja habilitado
    expect(button).toBeDisabled();
  });

  it('should be Enabled when disabled is false', () => {
    //Habilitando o botão
    const disable = false;

    render(
      <Button
        text='Load more'
        disabled={disable}
        onClick={() => console.log('Clicado')}
      />
    );

    const button = screen.getByRole('button', { name: /load more/i });

    expect(button).not.toBeDisabled();
  });
});
