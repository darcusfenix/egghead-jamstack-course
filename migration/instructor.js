module.exports = function(migration) {
  // create the contentype
  const instructor = migration
    .createContentType("instructor")
    .name("Instructor")
    .description("")
    .displayField("fullName")

  // fields
  instructor
    .createField("fullName")
    .name("Full Name")
    .type("Symbol")
  instructor
    .createField("slug")
    .name("Slug")
    .type("Symbol")
  instructor
    .createField("bio")
    .name("Bio")
    .type("Symbol")
  instructor
    .createField("website")
    .name("website")
    .type("Symbol")
  instructor
    .createField("twitter")
    .name("Twitter")
    .type("Symbol")
  instructor
    .createField("github")
    .name("Github")
    .type("Symbol")

  instructor
    .createField("avatar")
    .name("Avatar")
    .type("Link")
    .linkType("Asset")
  // appearances
  instructor.changeEditorInterface("slug", "slugEditor", {})
  instructor.changeEditorInterface("website", "urlEditor", {})
  instructor.changeEditorInterface("twitter", "urlEditor", {})
  instructor.changeEditorInterface("github", "urlEditor", {})
}
