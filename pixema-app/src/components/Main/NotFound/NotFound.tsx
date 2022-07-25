import { Link } from 'react-router-dom'
import './NotFound.scss'

const NotFound = () => {
  return (
    <section className='not-found'>
      <div>
        <h1>404. Страница не найдена</h1>
        <p>Возможно, она была перемещена, или вы просто неверно указали адрес страницы.</p>
        <Link to='/'>Вернуться на главную</Link>
      </div>
    </section>
  )
}

export default NotFound