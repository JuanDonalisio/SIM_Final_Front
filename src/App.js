import React, {useState} from 'react';
import './App.css';

const axios = require('axios').default;


class App extends React.Component {
    example_data = null

    indice = 0

    constructor(props) {
        super(props);
        this.state = {
            'tiempo_ingreso_informes_desde': 8,
            'tiempo_ingreso_informes_hasta': 12,

            'tiempo_ingreso_reservas_desde': 12,
            'tiempo_ingreso_reservas_hasta': 18,

            'demora_llegar_informes_desde': 3,
            'demora_llegar_informes_hasta': 7,

            'demora_llegar_reservas_di_desde': 5,
            'demora_llegar_reservas_di_hasta': 15,

            'demora_llegar_reservas_rc_desde': 12,
            'demora_llegar_reservas_rc_hasta': 18,

            'tiempo_atencion_informes_desde': 4,
            'tiempo_atencion_informes_hasta': 14,

            'tiempo_atencion_reservas_desde': 5,
            'tiempo_atencion_reservas_hasta': 9,

            'probabilidad_irse': .6,

            'demora_salir_desde': 15,
            'demora_salir_hasta': 25,

            'mostrar_desde': 10,
            'mostrar_hasta': 20,

            'cant_simular': 20
        }
    }

    reRender = () => {
        // calling the forceUpdate() method
        this.forceUpdate();
    };

    async boton(datos) {

        await axios.post('http://181.4.7.217:3001/simulacion', datos, {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
        }).then(
            response => {
                this.example_data = response.data;
                this.reRender()
            }
        );
    }

    createModal(personas, tipo, reloj, key) {
        return <div className="modal fade" id={tipo + key} tabIndex="-1" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{tipo} - {reloj}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <table className="table table-striped table-bordered">
                            <thead className="formatter">
                            <tr>
                                <th>
                                    Tipo
                                </th>
                                <th>
                                    RND
                                </th>
                                <th>
                                    Demora
                                </th>
                                <th>
                                    Llegada
                                </th>
                            </tr>
                            </thead>
                            <tbody className="overflow-auto formatter">
                            {personas.map((fila, key) =>
                                <tr>
                                    <td>{fila.tipo}</td>
                                    <td>{fila.rnd}</td>
                                    <td>{fila.demora}</td>
                                    <td>{fila.fin}</td>
                                </tr>
                            )}
                            </tbody>
                        </table>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Aceptar</button>
                    </div>
                </div>
            </div>
        </div>
    }

    renderTabla() {
        if (this.example_data !== null) {
            return <div className="table-responsive">
                <table className="table table-striped table-bordered tablita">
                    <thead>
                    <tr>
                        <th rowSpan="3" colSpan="1">
                            Fila
                        </th>
                        <th rowSpan="3" colSpan="1">
                            Reloj
                        </th>
                        <th rowSpan="3" colSpan="1">
                            Evento
                        </th>
                        <th rowSpan="1" colSpan="6">
                            Llegadas
                        </th>
                        <th rowSpan="1" colSpan="8">
                            Informes
                        </th>
                        <th rowSpan="1" colSpan="6">
                            Reservas
                        </th>
                        <th rowSpan="1" colSpan="1">
                            Salida
                        </th>
                        <th rowSpan="3" colSpan="1">
                            Personas simuladas
                        </th>
                    </tr>
                    <tr>
                        <th rowSpan="1" colSpan="3">Directo a Informes</th>
                        <th rowSpan="1" colSpan="3">Directo a Reservas</th>

                        <th rowSpan="2">En tránsito</th>
                        <th rowSpan="2">Cola</th>
                        <th rowSpan="2">Estado</th>
                        <th rowSpan="2">RND</th>
                        <th rowSpan="2">Tiempo de atención</th>
                        <th rowSpan="2">Fin de atención</th>

                        <th rowSpan="2">RND</th>
                        <th rowSpan="2">Sale del sistema</th>

                        <th rowSpan="2">En tránsito</th>
                        <th rowSpan="2">Cola</th>
                        <th rowSpan="2">Estado</th>
                        <th rowSpan="2">RND</th>
                        <th rowSpan="2">Tiempo de atención</th>
                        <th rowSpan="2">Fin de atención</th>

                        <th rowSpan="2">En tránsito</th>
                    </tr>
                    <tr>
                        <th>RND</th>
                        <th>Tiempo de llegada</th>
                        <th>Próxima llegada</th>
                        <th>RND</th>
                        <th>Tiempo de llegada</th>
                        <th>Próxima llegada</th>
                    </tr>
                    </thead>
                    <tbody className="overflow-auto">
                    {this.example_data.data.map((fila, key) =>
                        <tr>
                            <td>{fila[0]}</td>
                            <th scope="row">{fila[1]}</th>
                            <td>{fila[2]}</td>
                            <td>{fila[3]}</td>
                            <td>{fila[4]}</td>
                            <td>{fila[5]}</td>
                            <td>{fila[6]}</td>
                            <td>{fila[7]}</td>
                            <td>{fila[8]}</td>
                            <td>
                                <button className="btn btn-outline-primary" data-bs-toggle="modal"
                                        data-bs-target={"#Informes" + key}>
                                    {fila[9].length} persona/s
                                </button>

                                {this.createModal(fila[9], 'Informes', fila[1], key)}
                            </td>
                            <td>{fila[10]}</td>
                            <td>{fila[11]}</td>
                            <td>{fila[12]}</td>
                            <td>{fila[13]}</td>
                            <td>{fila[14]}</td>
                            <td>{fila[15]}</td>
                            <td>{fila[16]}</td>
                            <td>
                                <button className="btn btn-outline-primary" data-bs-toggle="modal"
                                        data-bs-target={"#Reservas" + key}>
                                    {fila[17].length} persona/s
                                </button>

                                {this.createModal(fila[17], 'Reservas', fila[1], key)}
                            </td>
                            <td>{fila[18]}</td>
                            <td>{fila[19]}</td>
                            <td>{fila[20]}</td>
                            <td>{fila[21]}</td>
                            <td>{fila[22]}</td>
                            <td>
                                <button className="btn btn-outline-primary" data-bs-toggle="modal"
                                        data-bs-target={"#Salida" + key}>
                                    {fila[23].length} persona/s
                                </button>

                                {this.createModal(fila[23], 'Salida', fila[1], key)}
                            </td>
                            <td>{fila[24]}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        } else {
            return <div></div>
        }
    }

    updateInputValue(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        console.log(name)
        console.log(value)

        this.setState({
            [name]: parseFloat(value)
        });
    }

    render() {
        return (
            <div className="App p-5 ">
                <div>Autor: Juan Pablo Donalisio</div>
                <row className="row justify-content-center mt-3">
                    <div className="me-2 col-2">
                        <div><label htmlFor="exampleInputEmail1">Tiempo entre ingresos a informes [Desde]</label>
                            <input value={this.state.tiempo_ingreso_informes_desde}
                                   onChange={evt => this.updateInputValue(evt)}
                                   type="email" className="form-control" name="tiempo_ingreso_informes_desde"
                                   aria-describedby="emailHelp"
                                   placeholder="Tiempo [minutos]"/>
                        </div>
                    </div>
                    <div className="ms-2 col-2">
                        <div><label htmlFor="exampleInputEmail1">Tiempo entre ingresos a informes [Hasta]</label>
                            <input value={this.state.tiempo_ingreso_informes_hasta}
                                   onChange={evt => this.updateInputValue(evt)}
                                   type="email" className="form-control" name="tiempo_ingreso_informes_hasta"
                                   aria-describedby="emailHelp"
                                   placeholder="Tiempo [minutos]"/>
                        </div>
                    </div>
                </row>

                <row className="row justify-content-center mt-3">
                    <div className="me-2 col-2">
                        <div><label htmlFor="exampleInputEmail1">Tiempo entre ingresos a reservas [Desde]</label>
                            <input value={this.state.tiempo_ingreso_reservas_desde}
                                   onChange={evt => this.updateInputValue(evt)}
                                   type="email" className="form-control" name="tiempo_ingreso_reservas_desde"
                                   aria-describedby="emailHelp"
                                   placeholder="Tiempo [minutos]"/>
                        </div>
                    </div>
                    <div className="ms-2 col-2">
                        <div><label htmlFor="exampleInputEmail1">Tiempo entre ingresos a reservas [Hasta]</label>
                            <input value={this.state.tiempo_ingreso_reservas_hasta}
                                   onChange={evt => this.updateInputValue(evt)}
                                   type="email" className="form-control" name="tiempo_ingreso_reservas_hasta"
                                   aria-describedby="emailHelp"
                                   placeholder="Tiempo [minutos]"/>
                        </div>
                    </div>
                </row>

                <row className="row justify-content-center mt-3">
                    <div className="me-2 col-2">
                        <div><label htmlFor="exampleInputEmail1">Demora en llegar a informes [Desde]</label>
                            <input value={this.state.demora_llegar_informes_desde}
                                   onChange={evt => this.updateInputValue(evt)}
                                   type="email" className="form-control" name="demora_llegar_informes_desde"
                                   aria-describedby="emailHelp"
                                   placeholder="Tiempo [segundos]"/>
                        </div>
                    </div>
                    <div className="ms-2 col-2">
                        <div><label htmlFor="exampleInputEmail1">Demora en llegar a informes [Hasta]</label>
                            <input value={this.state.demora_llegar_informes_hasta}
                                   onChange={evt => this.updateInputValue(evt)}
                                   type="email" className="form-control" name="demora_llegar_informes_hasta"
                                   aria-describedby="emailHelp"
                                   placeholder="Tiempo [segundos]"/>
                        </div>
                    </div>
                </row>

                <row className="row justify-content-center mt-3">
                    <div className="me-2 col-2">
                        <div><label htmlFor="exampleInputEmail1">Demora en llegar a reservas desde informes
                            [Desde]</label>
                            <input value={this.state.demora_llegar_reservas_di_desde}
                                   onChange={evt => this.updateInputValue(evt)}
                                   type="email" className="form-control" name="demora_llegar_reservas_di_desde"
                                   aria-describedby="emailHelp"
                                   placeholder="Tiempo [segundos]"/>
                        </div>
                    </div>
                    <div className="ms-2 col-2">
                        <div><label htmlFor="exampleInputEmail1">Demora en llegar a reservas desde informes
                            [Hasta]</label>
                            <input value={this.state.demora_llegar_reservas_di_hasta}
                                   onChange={evt => this.updateInputValue(evt)}
                                   type="email" className="form-control" name="demora_llegar_reservas_di_hasta"
                                   aria-describedby="emailHelp"
                                   placeholder="Tiempo [segundos]"/>
                        </div>
                    </div>
                </row>

                <row className="row justify-content-center mt-3">
                    <div className="me-2 col-2">
                        <div><label htmlFor="exampleInputEmail1">Demora en llegar directo a reservas [Desde]</label>
                            <input value={this.state.demora_llegar_reservas_rc_desde}
                                   onChange={evt => this.updateInputValue(evt)}
                                   type="email" className="form-control" name="demora_llegar_reservas_rc_desde"
                                   aria-describedby="emailHelp"
                                   placeholder="Tiempo [segundos]"/>
                        </div>
                    </div>
                    <div className="ms-2 col-2">
                        <div><label htmlFor="exampleInputEmail1">Demora en llegar directo a reservas [Hasta]</label>
                            <input value={this.state.demora_llegar_reservas_rc_hasta}
                                   onChange={evt => this.updateInputValue(evt)}
                                   type="email" className="form-control" name="demora_llegar_reservas_rc_hasta"
                                   aria-describedby="emailHelp"
                                   placeholder="Tiempo [segundos]"/>
                        </div>
                    </div>
                </row>

                <row className="row justify-content-center mt-3">
                    <div className="me-2 col-2">
                        <div><label htmlFor="exampleInputEmail1">Tiempo de atención en informes [Desde]</label>
                            <input value={this.state.tiempo_atencion_informes_desde}
                                   onChange={evt => this.updateInputValue(evt)}
                                   type="email" className="form-control" name="tiempo_atencion_informes_desde"
                                   aria-describedby="emailHelp"
                                   placeholder="Tiempo [minutos]"/>
                        </div>
                    </div>
                    <div className="ms-2 col-2">
                        <div><label htmlFor="exampleInputEmail1">Tiempo de atención en informes [Hasta]</label>
                            <input value={this.state.tiempo_atencion_informes_hasta}
                                   onChange={evt => this.updateInputValue(evt)}
                                   type="email" className="form-control" name="tiempo_atencion_informes_hasta"
                                   aria-describedby="emailHelp"
                                   placeholder="Tiempo [minutos]"/>
                        </div>
                    </div>
                </row>

                <row className="row justify-content-center mt-3">
                    <div className="me-2 col-2">
                        <div><label htmlFor="exampleInputEmail1">Tiempo de atención en reservas [Desde]</label>
                            <input value={this.state.tiempo_atencion_reservas_desde}
                                   onChange={evt => this.updateInputValue(evt)}
                                   type="email" className="form-control" name="tiempo_atencion_reservas_desde"
                                   aria-describedby="emailHelp"
                                   placeholder="Tiempo [minutos]"/>
                        </div>
                    </div>
                    <div className="ms-2 col-2">
                        <div><label htmlFor="exampleInputEmail1">Tiempo de atención en reservas [Hasta]</label>
                            <input value={this.state.tiempo_atencion_reservas_hasta}
                                   onChange={evt => this.updateInputValue(evt)}
                                   type="email" className="form-control" name="tiempo_atencion_reservas_hasta"
                                   aria-describedby="emailHelp"
                                   placeholder="Tiempo [minutos]"/>
                        </div>
                    </div>
                </row>

                <row className="row justify-content-center mt-3">
                    <div className="me-2 col-2">
                        <div><label htmlFor="exampleInputEmail1">Probabilidad de irse</label>
                            <input value={this.state.probabilidad_irse} onChange={evt => this.updateInputValue(evt)}
                                   type="email" className="form-control" name="probabilidad_irse"
                                   aria-describedby="emailHelp"
                                   placeholder="Probabilidad"/>
                        </div>
                    </div>
                </row>

                <row className="row justify-content-center mt-3">
                    <div className="me-2 col-2">
                        <div><label htmlFor="exampleInputEmail1">Demora en salir [Desde]</label>
                            <input value={this.state.demora_salir_desde} onChange={evt => this.updateInputValue(evt)}
                                   type="email" className="form-control" name="demora_salir_desde"
                                   aria-describedby="emailHelp"
                                   placeholder="Tiempo [segundos]"/>
                        </div>
                    </div>
                    <div className="ms-2 col-2">
                        <div><label htmlFor="exampleInputEmail1">Demora en salir [Hasta]</label>
                            <input value={this.state.demora_salir_hasta} onChange={evt => this.updateInputValue(evt)}
                                   type="email" className="form-control" name="demora_salir_hasta"
                                   aria-describedby="emailHelp"
                                   placeholder="Tiempo [segundos]"/>
                        </div>
                    </div>
                </row>

                <row className="row justify-content-center mt-3">
                    <div className="me-2 col-2">
                        <div><label htmlFor="exampleInputEmail1">Mostrar desde</label>
                            <input value={this.state.mostrar_desde} onChange={evt => this.updateInputValue(evt)}
                                   type="email" className="form-control" name="mostrar_desde"
                                   aria-describedby="emailHelp"
                                   placeholder="Fila"/>
                        </div>
                    </div>
                    <div className="ms-2 col-2">
                        <div><label htmlFor="exampleInputEmail1">Mostrar hasta</label>
                            <input value={this.state.mostrar_hasta} onChange={evt => this.updateInputValue(evt)}
                                   type="email" className="form-control" name="mostrar_hasta"
                                   aria-describedby="emailHelp"
                                   placeholder="Fila"/>
                        </div>
                    </div>
                </row>

                <row className="row justify-content-center mt-3">
                    <div className="me-2 col-2">
                        <div><label htmlFor="exampleInputEmail1">Personas a simular</label>
                            <input value={this.state.cant_simular} onChange={evt => this.updateInputValue(evt)}
                                   type="email" className="form-control" name="cant_simular"
                                   aria-describedby="emailHelp"
                                   placeholder="Cantidad"/>
                        </div>
                    </div>
                </row>

                <button className="btn btn-outline-primary mt-5 mb-5" onClick={() => this.boton(this.state)}>
                    Simular
                </button>


                {this.renderTabla()}
            </div>
        );
    }
}

export default App;
