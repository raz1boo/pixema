import cn from 'classnames';
import { IMovie } from '../../types/IMovie';
import './Rating.scss'


const Rating = ({rating}:IMovie) => {
    const ratin= `${rating?.kp}`;
  return (
    <div className={cn("rating",rating?.kp &&((rating?.kp >= 7 && "rating__green") || (rating?.kp <= 5 && "rating__red")))} >{rating?.kp&&(!ratin.split('')[1]?ratin+'.0':ratin)}</div>
  )
}

export default Rating