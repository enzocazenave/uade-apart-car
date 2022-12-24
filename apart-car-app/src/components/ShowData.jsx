import { useContext } from "react";
import { UiContext } from "../context/UiContext";
import styles from '../styles/ShowData.module.css';

export const ShowData = () => {

    const { data, set_data, reset_data } = useContext(UiContext);

    return (
        <>
        <div className={ styles.containerMain }>
            {
                data.map(vehicle => (
                    <div className={ styles.container } key={ vehicle._id }>
                        <h3 className={ styles.title }>{ vehicle.plate }</h3>
                        <span className={ styles.dataText }><b className={ styles.colorTitle }>Titular: </b>{ vehicle.name } { vehicle.surname }</span>
                        <span className={ styles.dataText }><b className={ styles.colorTitle }>Número de legajo: </b>{ vehicle.docket }</span>
                        <span className={ styles.dataText }><b className={ styles.colorTitle }>DNI: </b>{ vehicle.dni }</span>
                        <span className={ styles.dataText }><b className={ styles.colorTitle }>Número de telepase: </b>{ vehicle.toll }</span>
                        <span className={ styles.dataText }><b className={ styles.colorTitle }>Saldo: </b>${ vehicle.money }</span>
                    </div>
                ))
            }
        </div>
        <button className={ styles.backButton } onClick={ () => reset_data() }>Volver</button>

        </>
    )
}
