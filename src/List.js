import React, { Component } from 'react';
import axios from 'axios'; 
import PagerService from './pager.service.js';
import download3 from './img/download3.png';
import left from './img/left.png';
import right from './img/right.png';



class List extends Component{
        
    constructor(props){
        super(props);
        this.state = {
            input : 0,
            file : '',
            index : 0,
            pagerMap : new Map(),
            pagedItems : [],
            getlist : []
        };
        this.pagerService = new PagerService();
        this.andAtSpring = this.andAtSpring.bind(this);
        this.getListAtSpring = this.getListAtSpring.bind(this);
        this.pagerMapSetting = this.pagerMapSetting.bind(this);
        this.setPage = this.setPage.bind(this);
    }
    
   

    componentWillMount() {
        this.getListAtSpring();
    }
    render() {
        return (
            <div>
            <table>
                <tbody>
                {this.state.pagedItems.map((list, i) =>
               <tr key={i}>
                   <td>
                       {list.date}
                   </td>
                   <td>
                       <img src={ download3 } onClick={() => this.andAtSpring(list.date)} width="20" height="20" alt=""/>
                   </td>
               </tr>
               )}
                </tbody>
            </table>
            <br/>
            <ul className="pagination" >
               <li>
               <img src={ left } onClick={() => this.setPage(this.state.pagerMap.get("currentPage") - 1)} width="20" height="20" alt=""/>
               </li>
               <li>
               <img src={ right } onClick={() => this.setPage(this.state.pagerMap.get("currentPage") + 1)} width="20" height="20" alt=""/>
               </li>
            </ul>
            </div>
            
        );
    }


    getListAtSpring = () => {
        axios.get('http://192.168.0.23:8080/getList')
          .then(response => { this.setState({ input : response.data })
               let pager = this.pagerService.getPager(this.state.input.length, 1, 8);
               this.pagerMapSetting(pager);
               this.setState({ pagedItems : this.state.input.slice(this.state.pagerMap.get("startIndex"), this.state.pagerMap.get("endIndex") + 1) });
               })
          .catch(response => {console.log(response);});
        }

        pagerMapSetting(pager) {
            this.state.pagerMap.set("totalItems", pager[0]);
            this.state.pagerMap.set("currentPage", pager[1]);
            this.state.pagerMap.set("pageSize", pager[2]);
            this.state.pagerMap.set("totalPages", pager[3]);
            this.state.pagerMap.set("startPage", pager[4]);
            this.state.pagerMap.set("endPage", pager[5]);
            this.state.pagerMap.set("startIndex", pager[6]);
            this.state.pagerMap.set("endIndex", pager[7]);
            this.state.pagerMap.set("pages", pager[8]);
        }    
        
    andAtSpring = (data) => {
        let videoName = data + ".mp4";
        axios.post('http://192.168.0.23:8080/and',{videoName :  videoName})
        .then(response => {console.log(response.data);})
        .catch(response => {console.log(response)})
    }

    setPage = (currentPage) => {
        let pager = this.pagerService.getPager(this.state.input.length, currentPage, 8);
        this.pagerMapSetting(pager);
        this.setState({ pagedItems : this.state.input.slice(this.state.pagerMap.get("startIndex"),this.state.pagerMap.get("endIndex")+1) });
    }
}
   

    


export default List;