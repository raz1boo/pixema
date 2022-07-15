import cn from 'classnames';
import { IMovie } from '../../types/IMovie';
import './Rating.scss'


const Rating = ({rating}:IMovie) => {
    const ratin= `${rating?.kp}`;
  return (
    <div
              className={cn(
                "rating",
                rating?.kp &&
                  ((rating?.kp >= 7 && "rating__green") ||
                    (rating?.kp <= 5 && "rating__red"))
              )}
            >
              {ratin.split('')[1]?ratin:ratin+'.0'}
            </div>
  )
}

export default Rating