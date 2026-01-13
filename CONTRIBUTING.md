# Contributing Guidelines

Thank you for considering contributing to the A Startup landing page project!

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on constructive feedback
- Respect differing viewpoints and experiences

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Create a new branch for your feature/fix
4. Make your changes
5. Run tests to ensure everything works
6. Commit your changes with clear messages
7. Push to your fork
8. Submit a pull request

## Development Workflow

### Branch Naming

- Feature: `feature/description`
- Bug fix: `fix/description`
- Documentation: `docs/description`
- Test: `test/description`

### Commit Messages

Follow conventional commits:

```
feat: add new testimonial section
fix: resolve mobile menu bug
docs: update README installation steps
test: add header component tests
```

### Before Submitting a PR

1. **Run all tests:**
   ```bash
   npm run test:all
   ```

2. **Check linting:**
   ```bash
   npm run lint
   ```

3. **Verify build:**
   ```bash
   npm run build
   ```

4. **Test locally:**
   ```bash
   npm run start
   ```

## Code Standards

### TypeScript

- Use TypeScript for all files
- Define proper types/interfaces
- Avoid `any` type unless absolutely necessary
- Use type inference where clear

### React

- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use proper prop types

### Styling

- Use Tailwind CSS utility classes
- Follow the design system colors
- Ensure responsive design (mobile-first)
- Maintain WCAG 2.2 AA compliance

### Testing

- Write tests for new features
- Maintain 80%+ code coverage
- Include unit, integration, and e2e tests
- Test accessibility features

### Accessibility

- Use semantic HTML
- Include ARIA labels where needed
- Ensure keyboard navigation
- Test with screen readers
- Maintain color contrast ratios

## Project Structure

When adding new features:

- **Components:** Place in `components/` with descriptive names
- **Tests:** Add `__tests__` directory next to component
- **Pages:** Use Next.js App Router structure in `app/`
- **Utilities:** Add to `lib/` directory
- **Types:** Define in component file or `types.ts`

## Pull Request Process

1. Update documentation if needed
2. Add/update tests for your changes
3. Ensure all tests pass
4. Update README if adding features
5. Request review from maintainers
6. Address review feedback
7. Squash commits before merge

## Testing Requirements

### Unit Tests
- Test component rendering
- Test user interactions
- Test edge cases
- Test accessibility

### Integration Tests
- Test component interactions
- Test state management
- Test navigation flows

### E2E Tests
- Test full user journeys
- Test across browsers
- Test responsive design
- Test accessibility

## Documentation

- Update README for feature changes
- Add JSDoc comments for complex functions
- Document component props
- Update CONTRIBUTING.md if process changes

## Questions?

Feel free to open an issue for:
- Bug reports
- Feature requests
- Documentation improvements
- Questions about the codebase

Thank you for contributing!
