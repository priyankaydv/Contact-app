import React ,{useState,useEffect} from 'react';
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import { uuid } from 'uuidv4';
import './App.css';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';
import ContactDetail from './ContactDetail';
import api from '../api/contact';
import { async } from 'regenerator-runtime';



function App() {
  const LOCAL_STORAGE_KEY="contacts";
  const [contacts,setContacts]=useState([]);

  //retrieveContacts
  const retrieveContacts= async()=>{
    const response =await api.get("/contacts");
    return response.data;
  };

  const addContactHandler =(contact) =>{
    console.log(contact);
    setContacts([...contacts,{id: uuid(), ...contact}]);
  };
const removeContactHandler =(id) =>{
  const newContactList =contacts.filter((contact)=>{
    return contact.id!==id;
  });
  setContacts(newContactList);
}

  useEffect(()=>{
     const retrieveContacts=JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if(retrieveContacts)setContacts(retrieveContacts); 
   
  },[]);

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(contacts));

  },[contacts]);
  
  return (
    <div className="ui container">
      <Router>
      <Header/><br/><br/><br/>
      <Switch>
      <Route path="/add" exact 
      render={(props)=>(<AddContact {...props} addContactHandler={addContactHandler}/>
      )}
      />

<Route path="/" exact 
      render={(props)=>(<ContactList {...props}    contacts={contacts} getContactId={removeContactHandler}/>)}/>
      </Switch>
      <Route path="/contact/:id" component={ContactDetail}/>
    

      </Router>
       
    </div>
  );
}

export default App;
