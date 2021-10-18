import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppContainer from './AppContainer';
import api from '../api';

const Home = () => {

    const [tasks,setTask] = useState(null)
    const [name,setName] = useState('')
    const [completed,setCompleted] = useState('')

    const fetchTasks = () => {
        api.getAllTask({
            name,completed
        }).then(res => {
            const result = res.data;
            setTask(result.data)
        });
    }
    
    useEffect(() => {
        fetchTasks();
    },[])

    const renderTask = () => {
        if (!tasks) {
            return (
                <tr>
                    <td colSpan="4">
                        Cargando tareas...
                    </td>
                </tr>
            )
        }

        if (tasks.length === 0) {
            return(
                <tr>
                    <td colSpan="4">
                        No existen tareas registradas... Registre una!
                    </td>
                </tr>
            )
        }

        return tasks.map((task) => (
            <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.name}</td>
                <td>{task.completed}</td>
                <td>
                    <Link
                        className="btn btn-warning"
                        to = {`/edit/${task.id}`}
                    >
                        Editar
                    </Link>

                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => {
                            api.deleteTask(task.id)
                                .then(fetchTasks)
                                .catch(err => {
                                alert('Error al eliminar la tarea' + task.id);
                            })
                        }}
                    > Eliminar </button>
                </td>
            </tr>

            ))

    }

    return (

        <AppContainer
        title='MIS TAREAS PERSONALES'
        >
            <h5 className="card-title"> Listado de Tareas Personales</h5>
            <p className="card-text">Se mas eficiente administra tus tareas.</p>
            <Link to='/add' className="btn btn-primary">Agregar Tarea</Link>
            <br />
            <br />
            <form>
                <div className='form-group'>
                    <label>Nombre</label>
                    <input className="form-control" type="text" value={name} onChange={e => setName(e.target.value)} />
                </div>

                <div className='form-check'>
                    <input type="checkbox" className="form-check-input" value={completed} onChange={e => setCompleted(e.target.checked)} />
                    <label className="form-check-label">Tarea completadas</label>
                </div>

                <div className='form-group mt-4'>
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={fetchTasks}
                    >
                        Buscar

                    </button>

                </div>

            </form>

            <div className="table-responsive mt-4">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Completed</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {renderTask()}
                    </tbody>
                </table>
            </div>
        </AppContainer>

    );
};

// function Home() {
//     return (
//         <div className="container">
//             <div className="row justify-content-center">
//                 <div className="col-md-8">
//                     <div className="card">
//                         <div className="card-header">Example Component</div>
//
//                         <div className="card-body">I'm an example component!</div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

export default Home;

// if (document.getElementById('example')) {
//     ReactDOM.render(<Home />, document.getElementById('example'));
// }
