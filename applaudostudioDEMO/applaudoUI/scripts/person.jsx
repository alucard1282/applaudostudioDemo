var Person = React.createClass(
{
    render : function (){
        return (
            <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12">
                    <div className="borderLine backgroundColorPerson">
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        First Name:
                                        <span>{this.props.first}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Last Name:
                                        <span>{this.props.last}</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
});

var PersonList = React.createClass(
{
    render : function() {
        var personNodes = this.props.data.map(function(Personaux){
            return  (<Person key={Personaux.id} id={Personaux.id} first={Personaux.first} last={Personaux.last}>
                        {Personaux.first + ' ' + Personaux.last}
                    </Person>);
        });
        return (
            <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12">
                    {personNodes}
                </div>
            </div>
        );
    }
});

var PersonForm = React.createClass({
    
    getInitialState: function() {
        return {First: '', Last: ''};
    
    },
    
    handleFisrtNameChange: function(e) {
        this.setState({First: e.target.value});
    },
    
    handleLastNameChange: function(e) {
        this.setState({Last: e.target.value});
    },

    handleSubmit: function(e) {
        e.preventDefault();
        var firstaux = this.state.First.trim();
        var lastaux = this.state.Last.trim();
        if (!firstaux || !lastaux) {
          return;
        }
        this.props.onPersonSubmit({first: firstaux, last: lastaux}, this.props.id);
        this.setState({First: '', Last: ''});
    },
    
    render : function() {
        return (
            <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12">
                    <div className="formPerson borderLine">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label for="firstName">First Name:</label>
                                <input type="text" name="firstName" id="firstName" value={this.state.First} onChange={this.handleFisrtNameChange} placeholder="fisrt Name here" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label for="lastName">Last Name:</label>
                                <input type="text" name="lastName" id="lastName" value={this.state.Last} onChange={this.handleLastNameChange} placeholder="last Name here" className="form-control" />
                            </div>
                            <input type="submit" value="Post" />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
});

var PersonBox = React.createClass(
{
    getInitialState : function(){
        return {data:[]};
    },
    LoadPersonData : function(){
        var xhr = new XMLHttpRequest();
        xhr.open('get',this.props.url,true);
        xhr.onload = function(){
            var data = JSON.parse(xhr.responseText);
            this.setState({data: data});
        }.bind(this);
        xhr.send();
    },
    componentWillMount : function(){
        this.LoadPersonData();
    },
    handlePersonSubmit: function(Person, idparam) {        
        var postdata = JSON.stringify({
            id: idparam,
            first: Person.first,
            last: Person.last
        });

        console.log(postdata);
        console.log(idparam);
        var xhr = new XMLHttpRequest();
        xhr.open('post', this.props.url,true);
        xhr.setRequestHeader("Accept","application/json");
        xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
        xhr.onload = function(){
            this.LoadPersonData();
        }.bind(this);
        xhr.send(postdata);
    },
    render : function(){
        return (
            <div className="container borderLine">
                <h1>Applaudostudio DEMO</h1>
                <PersonList data={this.state.data}/>
                <PersonForm onPersonSubmit={this.handlePersonSubmit} id={this.state.data.length + 1}/>
            </div> 
        );
    }
});

ReactDOM.render(<PersonBox url='http://localhost:58315/api/persons'/>, document.getElementById('content'));
