import React , {Component} from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { storage } from "../firebase";
class FunctionHelper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            de : true,
            group: false,
            queue: false,
            qa: false,
            array : [],
            processedUserList: [],
            qqaamode:true
        }
    }


    getuserlist=()=>{
        console.log(this.props.userlist)
        if(this.props.userlist == null || this.props.userlist == undefined ){
            alert("Please retry again ")
        }
        else{
            //對userlist做處理
            let temp = this.props.userlist
            console.log(temp);
            this.setState({processedUserList: temp});
            this.forceUpdate();
        }
    }
    
    handleGroup = () => {
        this.setState({de:false, group: true, queue: false, qa: false })
    }
    handleQueue = () => {
        this.setState({de:false, group: false, queue: true, qa: false })
    }
    handleQA = () => {
        this.setState({de:false, group: false, queue: false, qa: true})
        if(this.state.qqaamode){//foreign
            //f to a
            this.setState({qqaamode : false})
        }
        else{
            //a to f
            this.setState({qqaamode : true})
        }
    }
    handleCS = () => {
        this.setState({de:false, group: false, queue: false, qa: false})
    }
    handleBack = (e) => {
        this.setState({de:true, group: false})
    }
    render() {
        
        return(
            this.state.de ? 
                (<Grid>
                    <Grid.Row columns="two" divided>
                        <Grid.Column>
                            <Button primary onClick={this.handleGroup} >
                                Group
                            </Button>
                        </Grid.Column>
                        <Grid.Column>
                            <Button primary onClick={this.handleQueue} >
                                Queue
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row centered>
                        <Button onClick={this.handleQA} >
                            Q/A Mode
                        </Button>
                    </Grid.Row>
                    <Grid.Row centered>
                        <Button onClick={this.handleCS}>
                            Choose speaking
                        </Button>
                    </Grid.Row>
                    <Grid.Row centered>
                        <Button onClick={this.getuserlist}>
                            get user
                        </Button>
                    </Grid.Row>
                </Grid>) : 
                this.state.group ? <Group handler={this.handleBack} /> : 
                this.state.queue ? <Queue handler={this.handleBack} userlist={this.state.processedUserList}/> :
                this.state.qa ? <QA handler={this.handleBack}  mode={this.state.qqaamode}/> : <ChooseSpeaker handler={this.handleBack} />

            
        )
        
    }
}

class Group extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        return <div>
            <Button icon="angle left" onClick={this.props.handler} />
        </div>
    }
}

class Queue extends Component {
    
    render(){
        return (
            <>
            
            <Button icon="angle left" onClick={this.props.handler} />
            <br/>
            <br/>
            {this.props.userlist.map((user)=>
                <Button>{user.displayName}</Button>
            )}
            </>
            );
    }
}

class ChooseSpeaker extends Component {
    render(){
        return (
            <>
        <Button icon="angle left" onClick={this.props.handler} />
            <br/>
            <br/>
            {this.props.userlist.map((user)=>
                <Button>{user.displayName}</Button>
            )}
            </>
        );
    }
}

class QA extends Component {
    render(){
        return (
        <>
        <Button icon="angle left" onClick={this.props.handler} />
        <br/>
        <br/>
        {(!this.props.mode)?<div>this is Asian Mode</div>:<div>this is Foreign Mode</div>}
        </>
        );
    }
}

export default FunctionHelper;
