import {Link} from 'react-router-dom'

export function Navegation(){
    return(
        <div className='flex justify-between py-3'>
            <Link to="/tasks"><h1 className='font-bold text-3xl mb-4'>Task App</h1></Link>
            <button className='bg-indigo-500 text-white px-3 py-2 rounded-lg'><Link to="/task-create">Create task</Link></button>
        </div>
    )
}

export default Navegation