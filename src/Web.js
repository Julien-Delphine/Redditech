import WebView from 'react-native-webview';
import React from 'react';
import { fetchToken } from './Api';

console.reportErrorsAsExceptions = false;

class Web extends React.Component {

    async _navChange(webViewState){
        if (webViewState.url.split('?')[0] === "http://localhost:19002/") {
            let code =  webViewState.url.split('=')[2].slice(0, -2)
            await fetchToken(code)
            this.props.navigation.navigate('Redditech')
        }
    }

    render() {
        return(
            <WebView 
            source={{ uri: 'https://www.reddit.com/api/v1/authorize.compact?client_id=d_1i5UGJTabHztrIKR-EPg&response_type=code&state=http://localhost:19002/&redirect_uri=http://localhost:19002/&duration=temporary&scope=identity,mysubreddits,subscribe,account,creddits,edit,flair,history,identity,livemanage,modconfig,modcontributors,modflair,modlog,modmail,modothers,modposts,modself,mysubreddits,privatemessages,read,save,structuredstyles,submit,subscribe,vote,wikiread' }} 
            onNavigationStateChange={this._navChange.bind(this)}
            />
        )
    }
}

export default (Web)
