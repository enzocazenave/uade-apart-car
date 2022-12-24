import { useContext } from 'react';
import { SearchBox } from './components/SearchBox';
import { ShowData } from './components/ShowData';
import { UiContext } from './context/UiContext';
import styles from './styles/App.module.css';

export const App = () => {

    const { data } = useContext(UiContext);

    return (
        <div className={ styles.container }>
            {
                (!data[0]) 
                    ? <SearchBox />
                    : <ShowData />
            }
        </div>
    )
}