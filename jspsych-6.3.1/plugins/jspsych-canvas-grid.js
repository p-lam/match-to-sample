/*
 * Example plugin template
 */

jsPsych.plugins["canvas-grid"] = (function() {

    var plugin = {};
  
    plugin.info = {
      name: "canvas-grid",
      parameters: {
        stimulus: {
            type: jsPsych.plugins.parameterType.FUNCTION,
            pretty_name: 'Stimulus',
            default: undefined,
            description: 'The drawing function to apply to the canvas. Should take the canvas object as argument.'
        },
        stimulus_duration: {
            type: jsPsych.plugins.parameterType.INT,
            pretty_name: 'Stimulus duration',
            default: null,
            description: 'How long to hide the stimulus.'
        },
        trial_duration: {
            type: jsPsych.plugins.parameterType.INT,
            pretty_name: 'Trial duration',
            default: null,
            description: 'How long to show trial before it ends.'
        },
        canvas_size: {
            type: jsPsych.plugins.parameterType.INT,
            array: true,
            pretty_name: 'Canvas size',
            default: [250, 250],
            description: 'Array containing the height (first value) and width (second value) of the canvas element.'
        }
      }
    }
  
    plugin.trial = function(display_element, trial) {

        var new_html = '<div id="jspsych-canvas-grid">' + '<canvas id="jspsych-canvas-stimulus" height="' + trial.canvas_size[0] + '" width="' + trial.canvas_size[1] + '"></canvas>' + '</div>';
        
        // Draw canvas
        display_element.innerHTML = new_html;
        let c = document.getElementById("jspsych-canvas-stimulus")
        trial.stimulus(c)

        // Store response
        var response = {
            stimulus: null
        };
        
        // Function to end trial
        var end_trial = function() {
            
            // Kill remaining setTimeout handlers
            jsPsych.pluginAPI.clearAllTimeouts();

            // Data to store for trial 
            var trial_data = {
                stimulus: trial.stimulus(c)
            };

            // Clear display
            display_element.innerHTML = '';

            // Proceed to next trial
            jsPsych.finishTrial(trial_data);

        }

        // End trial if trial_duration is set
        if (trial.trial_duration !== null) {
            jsPsych.pluginAPI.setTimeout(function () {
            end_trial();
            }, trial.trial_duration);
        }
    };
  
    return plugin;
  })();
  