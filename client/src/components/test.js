import React, {Component} from 'react';

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resource: props.resource
        };
    }

    renderActionItem = (action, key) => {
        return (
            <li key={Date.now()} className={"list-item actionitem"}>
                {action.name}
            </li>
        )
    }


    render() {
        console.log(this.props.resource.action)
        var actionList = this.props.resource.action.map((function (action) {
            return this.renderActionItem(action);
            console.log(actionList)
        }).bind(this));
        return (
            !this.props.resource ? (
                <div className={'rerer'}>
                    <div>
                        <div>
                            <label>Name</label>
                            <div>
                                {this.state.resource.name}</div>
                        </div>
                        <div>
                            <label>Description</label>
                            <div>
                                {this.state.resource.description}
                            </div>
                        </div>
                        <div>
                            <label>Resource type</label>
                            <div>
                                {this.state.resource.resourceType}
                            </div>
                        </div>
                        <div>
                            <label>Path</label>
                            <div>
                                {this.state.resource.path}
                            </div>
                        </div>
                    </div>
                    <div>{actionList}</div></div>):(<div/>))


    }
}

export default Test;