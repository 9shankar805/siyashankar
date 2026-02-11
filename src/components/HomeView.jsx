import Countdown from './Countdown'
import DailyMessage from './DailyMessage'
import RelationshipTimer from './RelationshipTimer'
import TypeWriter from './TypeWriter'

const HomeView = () => {
  return (
    <div className="view-container home-view">
      <main>
        <h1>We Have Been in Contact</h1>
        <Countdown targetDate="2023-10-20T22:59:00" />
      </main>
      <DailyMessage />
      <TypeWriter />
      <RelationshipTimer startDate="2018-01-27T20:53:00" />
    </div>
  )
}

export default HomeView
