# Guest Book

### Date

`21.12.27` ~`21.12.30`



### Execution

`npm start`



### Front-End

**Update File List**

- *App.js*
- *App.css*
- *Contents.js*



**Main**

```react
// App.js

<div className="App">
      <h1>Guest Book</h1>
      <div className="form-wrapper">
        <input className="name" type='text' placeholder="이름" onChange={getValue} name = 'name'/>
        <textarea className="content" placeholder="방명록 내용 입력" onChange={getValue} name = 'content'></textarea>
      </div>
      <button className="submit-button" onClick={handleClick}>글쓰기</button>
      
      {viewContent.map(e =>{
        return <Item Name = {e.name} Date = {e.date} Contents={e.content} />
      })}
 </div>
```

**Item Component**

```react
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
```



### Back-End

**Update File List**

- *server(folder)*
  - *config(folder)*
    - *db.js*
  - *server.js*

