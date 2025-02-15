import { getByPlaceholderText, render, screen } from '@testing-library/react';
import { TextInput } from '.';
import userEvent from '@testing-library/user-event';

describe('<TextInput>', () => {
  it('Should have a value of searchvalue', () => {
    //Cria uma função falsa
    const fn = jest.fn();

    //Renderiza a função com o valor de procura searchValue
    render(<TextInput handleChange={fn} searchValue={'testando'} />);

    //Procura um input que o placeholder seja typeYourSearch
    const input = screen.getAllByPlaceholderText(/type your search/i);

    //Verifica se o valor que foi digitado no input é testando
    expect(input.value).toBe('testando');
  });

  it('Should call handlechange function on each key pressed', () => {
    //Cria uma função fake
    const fn = jest.fn();

    //Renderiza o TextInput
    render(<TextInput handleChange={fn} searchValue='' />);

    const input = screen.getByPlaceholderText(/type your search/i);
    const value = 'o valor';

    userEvent.type(input, value);

    expect(input).toBe(value);

    expect(fn).toHaveBeenCalledTimes(value.length);

    //Busca todos os inputs que tenha o placeholder:type your search, e pega o primeiro valor
  });
});
