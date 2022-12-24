import styles from '../styles/SearchBox.module.css';
import Select from 'react-select';
import { useContext, useState } from 'react';
import api from '../api/api';
import { UiContext } from '../context/UiContext';
 
const uadeLogo = 'https://cdn.discordapp.com/attachments/1008885821027405958/1055275055258546326/Captura_de_pantalla_2022-12-21_a_las_21.05.34.png';

const SelectOptions = [
    { value: 'dni', label: 'Buscar por DNI', inputLabel: 'DNI' },
    { value: 'docket', label: 'Buscar por Número de legajo', inputLabel: 'Número de legajo' },
    { value: 'plate', label: 'Buscar por Número de patente', inputLabel: 'Número de patente' }
];

export const SearchBox = () => {

    const [selectedOption, setSelectedOption] = useState('dni');
    const [selectedOptionInputLabel, setSelectedOptionInputLabel] = useState('DNI');
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');
    const { set_data } = useContext(UiContext);
    

    const handleSelectChange = ({ value, inputLabel }) => {
        setSelectedOption(value);
        setSelectedOptionInputLabel(inputLabel);
    }

    const handleSubmit = async(event) => {
        event.preventDefault();

        if (selectedOption == 'dni' && inputValue.length <= 6) return setError('Dni inválido');
        if (selectedOption == 'docket' && (inputValue.length >= 7 || inputValue.length === 0)) return setError('Número de legajo inválido');
        if (selectedOption == 'plate' && (inputValue.length === 0 || inputValue.length > 7)) return setError('Número de patente inválido'); 

        const url = `/student/${ selectedOption }_${inputValue}`;

        try {
            const { data } = await api.get(url);
            
            delete data.ok;
            console.log(data);
            set_data(data);
        } catch(error) {
            setError(error.response.msg);
        }
    }

    return (
        <div className={ styles.container }>
            <img src={ uadeLogo } className={ styles.image }  />

            <form className={ styles.form } onSubmit={ handleSubmit }>
                <h2 className={ styles.formTitle }>Consultá tu saldo</h2>

                <p className={ styles.formText}>
                    Podes consultar el saldo de estacionamiento de tu telepase 
                    mediante tu DNI, Número de legajo o Número de patente de tu 
                    vehículo.
                </p>

                <Select
                    options={ SelectOptions }
                    defaultValue={ SelectOptions[0] }
                    onChange={ handleSelectChange }
                />

                {
                    (selectedOption !== '') && (
                        <input 
                            className={ styles.formInput } 
                            type="text" 
                            placeholder={ ` Ingresá tu ${ selectedOptionInputLabel }` }  
                            value={ inputValue }
                            onChange={ (e) => setInputValue(e.target.value) }
                        />
                    )
                }

                <button 
                    className={ `${ styles.formButton } ${ (inputValue.length === 0) && styles.formButton_disabled }` }
                    disabled={ inputValue.length === 0 }
                    type="submit"
                >
                    Buscar
                </button>
                {
                    (error) && <p style={{ color: 'red', fontSize: '1.4em' }}>{ error }</p>
                }
            </form>
        </div>
    )
}