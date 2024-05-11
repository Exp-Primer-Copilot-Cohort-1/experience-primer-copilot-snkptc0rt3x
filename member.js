function skillsMember() {
  return {
    skills: ['HTML', 'CSS', 'JavaScript'],
    addSkill: function(skill) {
      this.skills.push(skill);
    },
    removeSkill: function(skill) {
      this.skills = this.skills.filter(s => s !== skill);
    }
  };
}