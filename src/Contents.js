import React from 'react';
import './App.css';

class Item extends React.Component {
    static defaultProps = {
        Name: "홍길동",
        Date: "21-12-25",
        Contents: "내용없음",
    }

    state = {
        date: new Date()
    }

    render(){ 
        return (
            <div className="Item">
                
                <h4 class="Name">
                    {this.props.Name}
                </h4>
                
                <h4 class="Date">
                    {this.props.Date}
                </h4>

                <textarea class="Contents" disabled>
                    {this.props.Contents}
                </textarea>
            </div>
        );
    }
}
export default Item;