import React, { Component, useState, useEffect } from 'react';


// const  BrokerList= () =>{

//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedBroker, setSelectedBroker] = useState(null);
//   const [brokers,setBrokers] = useState([]);

//   useEffect(() => {
//     fetch('/api/brokers')
//       .then(response => response.json())
//       .then(data => setBrokers(data));
//   }, []);

//   const navigate = (broker) => {
//     this.setState({ selectedBroker: broker });
//   };
  
//   const handleSearchChange = (event) => {
//     this.setState({ searchQuery: event.target.value });
//   };
  
//   const contactBroker = (broker) => {
//     const emailTemplate = `Hi ${broker.name},\n\nI am interested in one of your listings. Can you please provide me with more information?\n\nThank you,\n[Your Name]`;
//     const mailToLink = `mailto:${broker.email}?subject=Regarding%20Your%20Listing&body=${encodeURIComponent(emailTemplate)}`;
//     window.open(mailToLink);
//   };

//   const filteredBrokers = brokers.filter((broker) =>
//     broker.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );
  
//   return (
//     <div className="search-main-container">
//           <div className="search-container">
//             <input
//               className="broker-search-bar"
//               type="text"
//               placeholder="Search for a broker..."
//               value={searchQuery}
//               onChange={this.handleSearchChange}
//             />
//           </div>

//           {/*<ul className='broker-list'>*/}
//           {filteredBrokers.map((broker, index) => (
//             <ul className="broker-list" key={index}>
//               <li>{broker.name} </li>
//               <li>Email: {broker.email}</li>
//               <li>Active Listings: {broker.activeListings}</li>
//               <li><button onClick={() => this.contactBroker(broker)}>Contact</button></li>
//             </ul>
//           ))}
//           {/*</ul>*/}
//         </div>
//   );
// }


class BrokerList extends Component {
  constructor() {
    super();
   
    this.state = {
      brokers: [
        {
          name: "John Doe",
          activeListings: 5,
          email: "john@mail.com"
        },
        {
          name: "Jane Doe",
          activeListings: 10,
          email: "jane@mail.com"
        },
        {
          name: "John Smith",
          activeListings: 15,
          email: "smith@mail.com"
        },
        {
          name: "Jane Smith",
          activeListings: 20,
          email: "janesmith@mail.com"
        },
        {
          name: "Nancy Drew",
          activeListings: 25,
          email: "nancydrew@mail.com"
        },
        {
          name: "John Doe",
          activeListings: 5,
          email: "john@mail.com"
        },
        {
          name: "Jane Doe",
          activeListings: 10,
          email: "jane@mail.com"
        },
        {
          name: "John Smith",
          activeListings: 15,
          email: "smith@mail.com"
        },
        {
          name: "Jane Smith",
          activeListings: 20,
          email: "janesmith@mail.com"
        },
        {
          name: "Nancy Drew",
          activeListings: 25,
          email: "nancydrew@mail.com"
        },
        {
          name: "John Doe",
          activeListings: 5,
          email: "john@mail.com"
        },
        {
          name: "Jane Doe",
          activeListings: 10,
          email: "jane@mail.com"
        },
        {
          name: "John Smith",
          activeListings: 15,
          email: "smith@mail.com"
        },
        {
          name: "Jane Smith",
          activeListings: 20,
          email: "janesmith@mail.com"
        },
        {
          name: "Nancy Drew",
          activeListings: 25,
          email: "nancydrew@mail.com"
        },
        {
          name: "John Doe",
          activeListings: 5,
          email: "john@mail.com"
        },
        {
          name: "Jane Doe",
          activeListings: 10,
          email: "jane@mail.com"
        },
      ],
      searchQuery: "",
      selectedBroker: null,
    };
  }



    navigate = (broker) => {
      this.setState({ selectedBroker: broker });
    };

    handleSearchChange = (event) => {
      this.setState({ searchQuery: event.target.value });
    };

    contactBroker = (broker) => {
      const emailTemplate = `Hi ${broker.name},\n\nI am interested in one of your listings. Can you please provide me with more information?\n\nThank you,\n[Your Name]`;
      const mailToLink = `mailto:${broker.email}?subject=Regarding%20Your%20Listing&body=${encodeURIComponent(emailTemplate)}`;
      window.open(mailToLink);
    };

    render() {
      const { brokers, searchQuery } = this.state;

      const filteredBrokers = brokers.filter((broker) =>
        broker.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      return (
        <div className="search-main-container">
          <div className="search-container">
            <input
              className="broker-search-bar"
              type="text"
              placeholder="Search for a broker..."
              value={searchQuery}
              onChange={this.handleSearchChange}
            />
          </div>

          {/*<ul className='broker-list'>*/}
          {filteredBrokers.map((broker, index) => (
            <ul className="broker-list" key={index}>
              <li>{broker.name} </li>
              <li>Email: {broker.email}</li>
              <li>Active Listings: {broker.activeListings}</li>
              <li><button onClick={() => this.contactBroker(broker)}>Contact</button></li>
            </ul>
          ))}
          {/*</ul>*/}
        </div>
      );
    }
  }

  export default BrokerList;


//   render() {
//     const { brokers, searchQuery } = this.state;
    
//     const filteredBrokers = brokers.filter((broker) =>
//       broker.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     return (
//       <div className = "search-main-container">
//       <div className = "search-container">
//         <input className = "broker-search-bar"
//           type="text"
//           placeholder="Search for a broker..."
//           value={searchQuery}
//           onChange={this.handleSearchChange}
//         />
//       </div>
      
//         {/*<ul className='broker-list'>*/}
//           {filteredBrokers.map((broker, index) => (
//             <li className = 'broker-list' key={index}>
//               {broker.name} - Email: {broker.email} - Active Listings: {broker.activeListings}
//               <button onClick={() => this.contactBroker(broker)}>Contact</button>
//             </li>
//           ))}
//         {/*</ul>*/}
        
//       </div>
//     );
//   }
// }

// export default BrokerList;


