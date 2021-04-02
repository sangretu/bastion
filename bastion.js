/**
 * bastion.js
 *
 * A container for a bulwark implementation and its supporting material.
 *
 * v0.0.0-BLM
 
 * 202104
 * aaron ward
 *
 * Doing something a bit new here and trying to use bulwark as a standard for
 * much of the data passing between functions, has required some careful
 * consideration, but I think I've got it to a reasonably scalable design.
 *
 * Bastion is intended to be a root-level object
 *
 * 2018-12-07
 *
 * 20210402 Pulled this from gamemaster git repo and tinkering with it.
 * Changes marked with // TAG: version = ++gamemaster
 *//**
 * testlib.js
 *
 * A place to experiment
 *
 * 202103
 * aaron ward
 *
 **/

// This is a new trick for me, but I'm going to sculpt this as a self-executing
// function that creates a "bastion" object in the context of its caller;
// presumable "Window", which will make it a root-level object.

!function() // creates bastion object
{
  this.bastion = {}; // The "this" keyword changes scope from function to caller.
  
  // Same UUIDv4 as in charlotte, but included here to avoid dependencies
  bastion.UUIDv4 = function b(a)
  {
    return a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,b)
  };
  
  { // Bulwark
  
    // The key new design principle here is that all access to the private members is
    // through the accessors, and all calls to the accessors are made from member
    // functions. The goal is not to keep callers from getting access to the private
    // members, but rather an attempt to make all data access and modification to be
    // done by function call rather than direct access to support arbitrary changes
    // as happens when rules randomly interact with each other. So foo.setBar('baz')
    // is fine but foo.getBar().baz ='tinkle' is not...even though it would work.
  
    bastion.Bulwark = function(parameters)
    {      
      var meta = {}; // private
      var data = {}; // private
      
      this.getMeta = function(parameters) { return meta; }; // TAG: version = ++gamemaster
      this.getData = function(parameters) { return data; }; // TAG: version = ++gamemaster
      
      this.setMeta = function(scab) { meta = scab; return this.getMeta(); };      
      this.setData = function(scab) { data = scab; return this.getData(); };
      
      // initialization section
      
      this.getMeta().instanceId = bastion.UUIDv4();
      
      // expecting the following to be overridden by child classes
      
      // using variable for class id because I'm not sure I want
      // to keep the definition within the class, will make it
      // easier to move and/or update later.
      
      const CLASS_ID_BULWARK      = "0d1d972c-1763-434f-a174-c66cbf76cb4c";
      this.getMeta().className  = 'Bulwark';
      this.getMeta().classId    = CLASS_ID_BULWARK;      
    };
    
    bastion.Bulwark.prototype.getClassName = function()
    {
      return this.getMeta().className;
    };
    
    bastion.Bulwark.prototype.setClassName = function(scab)
    {
      this.getMeta().className = scab;
      return this.getClassName();
    };
    
    bastion.Bulwark.prototype.getClassId = function()
    {
      return this.getMeta().classId;
    };
    
    bastion.Bulwark.prototype.setClassId = function(scab)
    {
      this.getMeta().classId = scab;
      return this.getClassId();
    };
    
    bastion.Bulwark.prototype.getInstanceId = function()
    {
      return this.getMeta().instanceId;
    };
    
    bastion.Bulwark.prototype.setInstanceId = function(scab)
    {
      this.getMeta().instanceId = scab;
      return this.getInstanceId();
    };
    
    // TODO: Really not sure how to organize this part and at what level
    
    bastion.Bulwark.prototype.getSummary = function()
    {
      var summary = 'Bulwark/' + this.getClassName() + '\n';
      
      //for (x in this.getMeta()) summary +=   '  meta[' + x + '] = ' + this.getMeta()[x].toString() + '\n';
      for (x in this.getData())
      {
        summary +=   this.getClassName() + '.data[' + x + '] = ' + this.getData()[x].toString() + '\n';
      };
      
      // TODO: This is so messy
      
      var regex = /\n\n/gi;

      summary = summary.replace(regex, '\n');
      
      return summary;
    };
    
    bastion.Bulwark.prototype.toString = function()
    {
      var result = this.getSummary();
      
      return result;
    };
    
    // TODO: Naive but effective for now
    bastion.Bulwark.prototype.getDetail = function()
    {
      var result = '';
      result += '\nObject of type ' + this.getClassName() + ' (Bulwark):\n';
      
      for (x in this.getMeta())
      {        
        result += '  meta[' + x + '] = ' + this.getMeta()[x].toString() + '\n';
      };
      
      for (x in this.getData())
      {
        var data = this.getData()[x];
        
        if (Array.isArray(data))
        {
          for (y in data)
          {
            // TODO: theoretically this needs to be recursive
            result += '    data[' + x + '][' + y + '] = ' + data[y].toString() + '\n';
          }
        
        } else
        {
          result += '  data[' + x + '] = ' + this.getData()[x].toString() + '\n';
        };
      };
      
      return result;
    };
  
  }
  
  { // Parameters
  
    // TODO: I am not convinced this needs to exist.
  
    bastion.Parameters = function(parameters)
    {
      bastion.Bulwark.call(this, parameters);
      
      throw 'Are you sure you need a parameters object that derives from Bulwark?';
      
      // initialize Bulwark meta section
      
      var CLASS_ID_PARAMETERS = "a92a1e7e-a44b-483e-ad41-6a8c69a102b0";
      this.setClassName('Parameters');
      this.setClassId(CLASS_ID_PARAMETERS);
    }
    
    bastion.Parameters.prototype = Object.create(bastion.Bulwark.prototype);
  
  }
  
  { // ActivityLog
  
    bastion.ActivityLog = function(parameters)
    {
      bastion.Bulwark.call(this, parameters);
      
      this.setData([]); // Data is an array
      
      // initialize Bulwark meta section
      
      var CLASS_ID_ACTIVITY_LOG = "2634bd89-23d9-4100-990f-d798f82c1c46";
      this.setClassName('ActivityLog');
      this.setClassId(CLASS_ID_ACTIVITY_LOG);
    }
    
    bastion.ActivityLog.prototype = Object.create(bastion.Bulwark.prototype);
    
    bastion.ActivityLog.prototype.getLog = function()
    {
      return this.getData();
    };
    
    bastion.ActivityLog.prototype.log = function(entry)
    {
      this.getData().push(entry);
    };
  
  }
  
  { // Request
  
    bastion.Request = function(parameters)
    {
      bastion.Bulwark.call(this, parameters);
      
      // initialize Bulwark meta section
      
      var CLASS_ID_REQUEST      = "4da8e3dd-ab45-4634-948b-27b9def36ac0";
      this.setClassName('Request');
      this.setClassId(CLASS_ID_REQUEST);
    }
    
    bastion.Request.prototype = Object.create(bastion.Bulwark.prototype);
  
  }
  
  { // Template
  
    bastion.Template = function(parameters)
    {
      bastion.Bulwark.call(this, parameters);
      
      // initialize Bulwark meta section
      
      var CLASS_ID_TEMPLATE = "insert_uuid_here";
      this.setClassName('Template');
      this.setClassId(CLASS_ID_TEMPLATE);
    }
    
    bastion.Template.prototype = Object.create(bastion.Bulwark.prototype);
  
  }
  
}(); // Self-execute

// Testing in development

var logger = new bastion.ActivityLog();

console.log(logger);
