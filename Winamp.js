var exec = require('child_process').exec;
exports.action = function (data, callback, config, SARAH)
{
    var Message;
    var path = 'plugins\\winamp\\CLAmp.exe /' + data.WinampAction;
    console.log(path);

	
    // ******* Start Winamp if necessary :  *******
	
    var child = exec("plugins\\winamp\\CLAmp.exe /status", function (error, stdout, stderr) 
    {
        if (error !== null) {
            console.log('exec error: ' + error);
        }
        else 
        {
            if (stdout !== null) 
            {
                Message = stdout;
                if (Message == 'NOT RUNNING') {
                    console.log(data.WinampAction.substring(7, 10) + '----------');
                }
            }
        }
    });
	
	
	// ******* Execute selected command :  *******
    var child = exec(path, function (error, stdout, stderr) 
    {
        if (error !== null) {
            console.log('exec error: ' + error);
        }
        else 
        {
            if (stdout !== null) 
            {
	// ******* Making SARAH response :  *******
                Message = stdout;
                switch (data.WinampAction) 
                {
                    case 'Play':
                        callback({ 'tts' : "Lecture" });
                        break;
                    case 'Stop':
                        callback({ 'tts' : "Stop" });
                        break;
                    case 'Pause':
                        callback({ 'tts' : "Pause" });
                        break;
                    case 'Next':
                        callback({ 'tts' : "Piste suivante" });
                        break;
                    case 'Prev':
                        callback({ 'tts' : "Piste Précédente" });
                        break;
                    case 'StopAfter':
                        callback({ 'tts' : "Dernière chanson" });
                        break;
                    case 'Title':
                        console.log(Message);
                        callback({ 'tts' : Message  });
                        break;
                    default:
						if (data.param1 == null) {
                        callback({ 'tts' : "action effectuée" });
						}
                        break;
                }
                if (data.param1 == 'VolumeChange') {
                    callback({'tts' : "volume à " + data.param2 + "sur 10"});
                }

            }
        };
    });
};
