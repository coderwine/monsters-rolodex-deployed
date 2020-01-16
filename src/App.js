import React, { Component} from 'react';  //importing all React files that is required
import './App.css';  
import {CardList} from './components/card-list/card-list.component';
import {SearchBox} from './components/search-box/search-box.component';

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: ''
    }

    // this.handleChange = this.handleChange.bind(this);
    // adding this varaibale within the constructor allows for the return statement to process the information that is being passed through the search component.  This is because the constructor is run first and therefore allows our custom handleChange method to genereate a state that it cannot do on it's own. This is only necessary if the method being called isn't a fatarrow function.  ** see notes below the fatarrow handleChange function.
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => this.setState({monsters: users}));
    
  }
  // the componentDidMount() method allows us to use the component toolset within React to build out the this.state monster array by fetching from the url associated.  After the fetch, it then provides a response (the promise from the fetch), builds a json and then builds the monsters per the users within that fetch using the this.setState() method. 
  
  // ----------------------handleChange sample
  // handleChange(e) {
  //   this.setState({ searchField: e.target.value })}
  // }
  // the handleChange function needs ot pass through the constructor in order to not be noted as undefined.
    handleChange = e => {
      this.setState({ searchField: e.target.value })}
    
  // because of the arrow function, React understand to use this function in the same way the other example was written so that it doesn't need to pass through the constructor.  They automatically get lexical scoping which means that they bind in the content.

  render() {

    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter(monster => 
        monster.name.toLowerCase().includes(searchField.toLowerCase()));  //the toLowerCase is to make it so that the search doesn't require uppercase characters but rather searches ALL characters equally.  This allows for the search field to be injected with a new character and a new rendering is then processed.  Once a character lands or is removed, it rerenders.   This is completed by React for us.
    

    return (

    <div className="App">
      <h1>Monsters Rolodex</h1>
      <SearchBox 
        placeholder='search monsters'
        handleChange={ this.handleChange } />
      <CardList monsters={ filteredMonsters }/>

    </div>
    
    )
  };
}

export default App;

// keys are needed so that it can fully know what should be changed if something is to change.  If a name changes, it can quickly respond to that.
// map() + key attribute:  A good rule of thumb as to when to use the key attribute is:  Anytime you use the map() function inside of render, or you have a list of the same jsx elements one after another, they need a key attribute.