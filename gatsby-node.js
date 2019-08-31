const path = require(`path`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  const lessonTemplate = path.resolve(`src/templates/lesson.js`);
  const instructorTemplate = path.resolve(`src/templates/instructor.js`);
  const courseTemplate = path.resolve(`src/templates/course.js`);
  return graphql(`
    {
      allContentfulLesson {
        edges {
          node {
            slug
          }
        }
      }
      allContentfulInstructor {
        edges {
          node {
            slug
          }
        }
      }
      allShopifyProduct {
        edges {
          node {
            shopifyId
            handle
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors;
    }

    result.data.allContentfulLesson.edges.forEach(edge => {
      createPage({
        path: `/lessons/${edge.node.slug}`,
        component: lessonTemplate,
        context: {
          slug: edge.node.slug,
        },
      });
    });
    result.data.allContentfulInstructor.edges.forEach(edge => {
      createPage({
        path: `/instructors/${edge.node.slug}`,
        component: instructorTemplate,
        context: {
          slug: edge.node.slug,
        },
      });
    });
    result.data.allShopifyProduct.edges.forEach(edge => {
      createPage({
        path: `/courses/${edge.node.handle}`,
        component: courseTemplate,
        context: {
          shopifyId: edge.node.shopifyId,
        },
      });
    });
  });
};

// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;
  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/account/)) {
    page.matchPath = "/account/*";
    // Update the page.
    createPage(page);
  }
};
