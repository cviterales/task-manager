import { Fragment } from 'react';
import Card from "../../../Card";
import styles from './styles.module.scss';

const TeamItems = ({team}) => {

  const renderTeam = (team) => {
    return team.map((team, index) => {
      return (
        <Fragment key={index}>
          <img className={styles.img} src={`${team.photo}`} alt="" title={team.operator_name} />
        </Fragment>
      )
    })
  }

  return (
    <>
      <Card>
        <div className={styles.team_content}>
          <p> #{team[0].id_team}</p>
          <p> {team[0].vehicle_name}</p>
          <div className={styles.img_content}>
            {renderTeam(team)}
          </div>
        </div>
      </Card>
    </>
  );
};

export default TeamItems;
