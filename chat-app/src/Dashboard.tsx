import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { CTX } from "./Store";
import 'typeface-roboto';

const useStyles = makeStyles(theme => ({
  root: {
    margin: "50px",
    padding: theme.spacing(3, 2)
  },
  flex: {
    display: "flex",
    alignItems: "center",
    padding: "10px"
  },
  topicsWindow: {
    width: "30%",
    height: "300px",
    borderRight: "1px solid black"
  },
  chatWindow: {
    width: "70%",
    height: "300px",
    padding: "20px",
    overflow: "auto"
  },
  chatBox: {
    width: "85%"
  },
  button: {
    width: "15%"
  },
  userMessage: {
    flexDirection: "row-reverse" as "row-reverse",
  },
  message: {
    marginLeft: "10px;",
    marginRight: "10px;"
  }

}));

const Dashboard = () => {
  const classes = useStyles();

  const { allChats, sendChatAction, user } = React.useContext(CTX);

  const topics = Object.keys(allChats);

  const [textValue, changeTextValue] = React.useState("");

  const [activeTopic, changeActiveTopic] = React.useState(topics[0]);

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h4" component="h4">
          Chat app by Mantas Gailius
        </Typography>
        <Typography variant="h5" component="h5">
          {activeTopic}
        </Typography>

        <div className={classes.flex}>
          <div className={classes.topicsWindow}>
            <List>
              {topics.map(topic => (
                <ListItem
                  onClick={(e: any) => changeActiveTopic(e.target.innerText)}
                  key={topic}
                  button
                  selected={activeTopic === topic}
                >
                  <ListItemText primary={topic} />
                </ListItem>
              ))}
            </List>
          </div>
          <div className={classes.chatWindow}>
            {allChats[activeTopic].map((chat: any, index: any) => (
              <div className={
                classes.flex + " " + (chat.from === user ? classes.userMessage : null)
                } key={index}>
                <Chip label={chat.from} />
                <Typography component="p" className={classes.message}>{chat.msg}</Typography>
              </div>
            ))}
          </div>
        </div>
        <div className={classes.flex}>
          <TextField
            label="Send a chat"
            className={classes.chatBox}
            value={textValue}
            onChange={e => changeTextValue(e.target.value)}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              sendChatAction({
                msg: textValue,
                from: user,
                topic: activeTopic
              });
              changeTextValue("");
            }}
          >
            Send
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default Dashboard;
