/**
 * jsPsych plugin for showing scenes that mimic the experiments described in
 *
 * Fiser, J., & Aslin, R. N. (2001). Unsupervised statistical learning of
 * higher-order spatial structures from visual scenes. Psychological science,
 * 12(6), 499-504.
 *
 * Josh de Leeuw
 *
 * documentation: docs.jspsych.org
 *
 */

 jsPsych.plugins['grid-stimuli'] = (function() {

    var plugin = {};
  
    jsPsych.pluginAPI.registerPreload('grid-stimuli', 'stimuli', 'image');
  
    plugin.info = {
      name: 'grid-stimuli',
      description: '',
      parameters: {
        stimuli: {
          type: jsPsych.plugins.parameterType.IMAGE,
          pretty_name: 'Stimuli',
          array: true,
          default: undefined,
          description: 'An array that defines a grid.'
        },
        image_size: {
          type: jsPsych.plugins.parameterType.INT,
          pretty_name: 'Image size',
          array: true,
          default: [60,60],
          description: 'Array specifying the width and height of the images to show.'
        },
        trial_duration: {
          type: jsPsych.plugins.parameterType.INT,
          pretty_name: 'Trial duration',
          default: 2000,
          description: 'How long to show the stimulus for in milliseconds.'
        }
      }
    }
  
    plugin.trial = function(display_element, trial) {
  
      display_element.innerHTML = plugin.generate_stimulus(trial.stimuli, trial.image_size);
  
      jsPsych.pluginAPI.setTimeout(function() {
        endTrial();
      }, trial.trial_duration);
  
      function endTrial() {
  
        display_element.innerHTML = '';
  
        var trial_data = {
          stimulus: trial.stimuli
        };
  
        jsPsych.finishTrial(trial_data);
      }
    };
  
    plugin.generate_stimulus = function(pattern, image_size) {
        // cols = rows
        var nrows = pattern.length;
        var ncols = pattern[0].length;

        // create blank element to hold code that we generate
        var html = '<div id="jspsych-grid-stimuli-dummy" css="display: none;">';

        // create table
        html += '<table id="jspsych-grid-stimuli table" '+
        'style="border-collapse: collapse; margin-left: auto; margin-right: auto;">';

        for (var row = 0; row < nrows; row++) {
        html += '<tr id="jspsych-grid-stimuli-table-row-'+row+'" css="height: '+image_size[1]+'px;">';

        for (var col = 0; col < ncols; col++) {
            html += '<td id="jspsych-grid-stimuli-table-' + row + '-' + col +'" '+
            'style="padding: '+ (image_size[1] / 10) + 'px ' + (image_size[0] / 10) + 'px; border: 1px solid grey;">'+
            '<div id="jspsych-grid-stimuli-table-cell-' + row + '-' + col + '" style="width: '+image_size[0]+'px; height: '+image_size[1]+'px;">';
            if (pattern[row][col] !== 0) {
            html += '<img '+
                'src="'+pattern[row][col]+'" style="width: '+image_size[0]+'px; height: '+image_size[1]+'"></img>';
            }
            html += '</div>';
            html += '</td>';
        }
        html += '</tr>';
        }

        html += '</table>';
        html += '</div>';

        return html;
    
      };

      plugin.randInt = function(max) {
        return Math.floor(Math.random() * max);
      }
    
      plugin.intBinStr = function(sample, dim) {
          const b = sample.toString(2);
          const ps = b.padStart(dim, '0');
          return ps;
      }
    
      plugin.sample = function(n, dim) {
          var samples = new Array();
          for (let i = 0; i < n; i++) {
              let seed = randInt(Math.pow(2,dim));
              samples.push(intBinStr(seed));
          }
          return samples
      }
    
      plugin.sample_matrix = function(dim) {
          var matrix = [];
          var hash = sample(1,dim);
    
          for (i = 0, k = -1; i < hash.length; i=i+dim) {
            matrix.push(hash.slice(i,i+dim));
          }
          return matrix;
      }
    
    return plugin;
  })();
  