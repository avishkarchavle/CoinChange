import axios from "axios";
import React ,{useState,useEffect} from "react";
import ReactDOM from "react-dom";
import Coin from "./Coin";
import "./myApp.css";
import "./myCoin.css";



//useState is React Hook
// useEffect is used to run Axios when App Starts


//"https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h"


function App(){
        const [myCoins,setMyCoins]=useState([]);  //taking an array to store the data taken by axios
        const [search,setSearch]=useState("");

        useEffect(()=>{
                axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h")
                .then((res)=>
                // setting the data
                setMyCoins(res.data))
                .catch((error)=>console.log(error))
        },[]);


        function handleChange(event){
                setSearch(event.target.value);
        }

        //filter function  for data filtering and searching
        const filterCoin = myCoins.filter(coin=>
                coin.name.toLowerCase().includes(search.toLowerCase())
        )

        return( 
               
                 

                <div className="coin-app">

                        
                <h1>CoinChange</h1>
            

                  <div className="coin-search">
                    
                        {/* <h1 className="coin-text" > Search A Coin</h1> */}
                        <form >
                            <input type="text" placeholder="Search a coin" className="coin-input" onChange={handleChange}/>    
                        </form>
                   </div>
                  
                  
                   {filterCoin.map(coin=>{
                        return(
                         <Coin 
                            key={coin.id}
                            name={coin.name}
                            image={coin.image}
                            symbol={coin.symbol}
                            volume={coin.total_volume}
                            price={coin.current_price} 
                            priceChange={coin.price_change_percentage_24h}           
                            marketcap={coin.market_cap}    
                         />
                        )
                   })}
               
                </div>  
                 
                // myCoins.map() 
        );
}

export default App;